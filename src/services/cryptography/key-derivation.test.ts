import { beforeAll, describe, expect, test } from "bun:test";

import { installNativeCryptoMocks } from "@/test/mocks/native-crypto";

beforeAll(() => {
  installNativeCryptoMocks();
});

describe("KeyDerivationService", () => {
  test("generateSalt returns 16 random bytes", async () => {
    const { KeyDerivationService } = await import("./key-derivation");

    const salt = await KeyDerivationService.generateSalt();

    expect(salt).toBeInstanceOf(Uint8Array);
    expect(salt.length).toBe(16);
  });

  test("deriveKey returns a key of the requested length", async () => {
    const { KeyDerivationService, DEFAULT_SCRYPT_PARAMS } = await import(
      "./key-derivation"
    );

    const salt = await KeyDerivationService.generateSalt();
    const key = await KeyDerivationService.deriveKey({
      password: "correct horse battery staple",
      salt,
      params: DEFAULT_SCRYPT_PARAMS,
    });

    expect(key.length).toBe(DEFAULT_SCRYPT_PARAMS.keylen);
  });

  test("deriveKey is deterministic for the same password/salt/params", async () => {
    const { KeyDerivationService, DEFAULT_SCRYPT_PARAMS } = await import(
      "./key-derivation"
    );

    const salt = await KeyDerivationService.generateSalt();
    const input = { password: "hunter2", salt, params: DEFAULT_SCRYPT_PARAMS };

    const keyA = await KeyDerivationService.deriveKey(input);
    const keyB = await KeyDerivationService.deriveKey(input);

    expect(Array.from(keyA)).toEqual(Array.from(keyB));
  });

  test("deriveKey produces a different key for a different password", async () => {
    const { KeyDerivationService, DEFAULT_SCRYPT_PARAMS } = await import(
      "./key-derivation"
    );

    const salt = await KeyDerivationService.generateSalt();

    const keyA = await KeyDerivationService.deriveKey({
      password: "hunter2",
      salt,
      params: DEFAULT_SCRYPT_PARAMS,
    });
    const keyB = await KeyDerivationService.deriveKey({
      password: "hunter3",
      salt,
      params: DEFAULT_SCRYPT_PARAMS,
    });

    expect(Array.from(keyA)).not.toEqual(Array.from(keyB));
  });
});
