import { getRandomBytesAsync } from "expo-crypto";
import { scrypt } from "react-native-quick-crypto";

export type ScryptParams = {
  algorithm: "scrypt";
  version: 1;
  N: number;
  r: number;
  p: number;
  maxmem: number;
  keylen: number;
};

// scrypt costs (RFC 7914), tuned down from OWASP's server-side baseline
// (N=2^17) since this runs on mobile hardware during an interactive
// unlock. `version` is stored alongside these params wherever a derived
// key is used, so the costs can be raised later without breaking vaults
// created under the current ones.
export const DEFAULT_SCRYPT_PARAMS: ScryptParams = {
  algorithm: "scrypt",
  version: 1,
  N: 2 ** 15,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
  keylen: 32,
};

const SALT_BYTE_LENGTH = 16;

type DeriveKeyInput = {
  password: string;
  salt: Uint8Array;
  params: ScryptParams;
};

export const KeyDerivationService = {
  generateSalt: () => {
    return getRandomBytesAsync(SALT_BYTE_LENGTH);
  },

  deriveKey: ({ password, salt, params }: DeriveKeyInput) => {
    return new Promise<Uint8Array>((resolve, reject) => {
      scrypt(
        password,
        salt,
        params.keylen,
        { N: params.N, r: params.r, p: params.p, maxmem: params.maxmem },
        (error, derivedKey) => {
          if (error || !derivedKey) {
            reject(error ?? new Error("scrypt returned no derived key"));
            return;
          }

          resolve(new Uint8Array(derivedKey));
        },
      );
    });
  },
};
