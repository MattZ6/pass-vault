import { createHash } from "node:crypto";
import { mock } from "bun:test";

// Fakes for the native modules behind our AES/scrypt calls (expo-crypto,
// react-native-quick-crypto), so vault/master-password logic can run under
// `bun test` without a device. Both fakes are still password-sensitive —
// deriving a key from the wrong password produces a different key, which
// makes the fake AES decrypt reject it, the same way the real thing does.
// That's what lets tests assert on IncorrectMasterPasswordError.

class FakeAESEncryptionKey {
  readonly base64: string;

  constructor(base64: string) {
    this.base64 = base64;
  }

  static generate = async () => {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return new FakeAESEncryptionKey(Buffer.from(bytes).toString("base64"));
  };

  static import = async (
    data: Uint8Array | string,
    encoding?: "base64",
  ) => {
    const base64 =
      typeof data === "string"
        ? data
        : Buffer.from(data).toString("base64");

    return new FakeAESEncryptionKey(encoding === "base64" ? base64 : base64);
  };

  encoded = async (_encoding: "base64") => this.base64;
}

class FakeAESSealedData {
  constructor(
    private readonly plaintextBase64: string,
    private readonly keyBase64: string,
  ) {}

  static fromCombined = (combinedBase64: string) => {
    const decoded = JSON.parse(
      Buffer.from(combinedBase64, "base64").toString("utf8"),
    ) as { plaintextBase64: string; keyBase64: string };

    return new FakeAESSealedData(decoded.plaintextBase64, decoded.keyBase64);
  };

  combined = async (_encoding?: "base64") =>
    Buffer.from(
      JSON.stringify({
        plaintextBase64: this.plaintextBase64,
        keyBase64: this.keyBase64,
      }),
    ).toString("base64");

  decrypt = (key: FakeAESEncryptionKey) => {
    if (key.base64 !== this.keyBase64) {
      throw new Error("Fake AES: key does not match sealed data.");
    }

    return this.plaintextBase64;
  };
}

export function installNativeCryptoMocks() {
  mock.module("expo-crypto", () => ({
    AESEncryptionKey: FakeAESEncryptionKey,
    AESSealedData: FakeAESSealedData,
    AESKeySize: { AES128: 128, AES256: 256 },
    aesEncryptAsync: async (
      plaintextBase64: string,
      key: FakeAESEncryptionKey,
    ) => new FakeAESSealedData(plaintextBase64, key.base64),
    aesDecryptAsync: async (
      sealed: FakeAESSealedData,
      key: FakeAESEncryptionKey,
      _options: { output: "base64" },
    ) => sealed.decrypt(key),
    randomUUID: () => crypto.randomUUID(),
    getRandomBytesAsync: async (byteLength: number) =>
      crypto.getRandomValues(new Uint8Array(byteLength)),
  }));

  mock.module("react-native-quick-crypto", () => ({
    scrypt: (
      password: string,
      salt: Uint8Array,
      keylen: number,
      _options: { N: number; r: number; p: number; maxmem: number },
      callback: (error: unknown, derivedKey?: Uint8Array) => void,
    ) => {
      // Not real scrypt (no cost factors applied) — just needs to be a
      // deterministic, password-and-salt-sensitive stand-in for it.
      const derived = createHash("sha256")
        .update(password)
        .update(salt)
        .digest();

      callback(null, new Uint8Array(derived.subarray(0, keylen)));
    },
  }));
}
