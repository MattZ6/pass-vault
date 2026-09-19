import {
  AESEncryptionKey,
  AESSealedData,
  aesDecryptAsync,
  aesEncryptAsync,
} from "expo-crypto";

import { MasterPasswordRepository } from "@/repositories/master-password.repository";

import {
  DEFAULT_SCRYPT_PARAMS,
  KeyDerivationService,
  type ScryptParams,
} from "@/services/cryptography/key-derivation";

import { BinaryUtils } from "@/utils/binary";

import { type VaultKey, VaultKeyService } from "./key";

type SetupInput = {
  password: string;
};

type UnlockInput = {
  password: string;
};

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

async function deriveMasterKey(
  password: string,
  saltBase64: string,
  params: ScryptParams,
) {
  const salt = BinaryUtils.fromBase64(saltBase64);

  const derivedKeyBytes = await KeyDerivationService.deriveKey({
    password,
    salt,
    params,
  });

  return AESEncryptionKey.import(derivedKeyBytes);
}

async function wrapVaultKey(
  vaultKeySerialized: string,
  masterKey: AESEncryptionKey,
) {
  const sealedVaultKey = await aesEncryptAsync(vaultKeySerialized, masterKey);

  return sealedVaultKey.combined("base64");
}

// Best-effort: on Android, requireAuthentication:true items need the user
// to authenticate even to write them, so this can fail or be cancelled.
// It's only a convenience fast path — setup/unlock must still succeed
// without it, falling back to the password on the next unlock.
async function seedBiometricFastPath(vaultKeySerialized: string) {
  try {
    await MasterPasswordRepository.saveBiometricVaultKey(vaultKeySerialized);
  } catch (error) {
    console.log(error); // TODO: tratar aqui o erro
  }
}

async function unwrapVaultKey(
  wrappedVaultKeyBase64: string,
  masterKey: AESEncryptionKey,
): Promise<VaultKey> {
  const sealedVaultKey = AESSealedData.fromCombined(wrappedVaultKeyBase64);

  let vaultKeySerialized: string;

  try {
    vaultKeySerialized = await aesDecryptAsync(sealedVaultKey, masterKey, {
      output: "base64",
    });
  } catch {
    throw new Error("Incorrect master password.");
  }

  const key = await AESEncryptionKey.import(vaultKeySerialized, "base64");

  return { key, serialized: vaultKeySerialized };
}

export const MasterPasswordService = {
  hasMasterPassword: async () => {
    const record = await MasterPasswordRepository.getRecord();

    return record !== null;
  },

  // Wraps whichever vault key already exists (VaultKeyService generates one
  // on first access if none does) instead of creating a new one, so setting
  // up a master password never re-encrypts existing credentials.
  setup: async ({ password }: SetupInput) => {
    const vaultKey = await VaultKeyService.getVaultKey();

    const salt = await KeyDerivationService.generateSalt();
    const saltBase64 = BinaryUtils.toBase64(salt);

    const masterKey = await deriveMasterKey(
      password,
      saltBase64,
      DEFAULT_SCRYPT_PARAMS,
    );

    const wrappedVaultKeyBase64 = await wrapVaultKey(
      vaultKey.serialized,
      masterKey,
    );

    await MasterPasswordRepository.saveRecord({
      saltBase64,
      kdfParams: DEFAULT_SCRYPT_PARAMS,
      wrappedVaultKeyBase64,
    });

    await seedBiometricFastPath(vaultKey.serialized);

    return vaultKey;
  },

  unlock: async ({ password }: UnlockInput) => {
    const record = await MasterPasswordRepository.getRecord();

    if (!record) {
      throw new Error("No master password has been set up yet.");
    }

    const masterKey = await deriveMasterKey(
      password,
      record.saltBase64,
      record.kdfParams,
    );

    const vaultKey = await unwrapVaultKey(
      record.wrappedVaultKeyBase64,
      masterKey,
    );

    await seedBiometricFastPath(vaultKey.serialized);

    return vaultKey;
  },

  // Reads the biometric-gated copy directly; the OS (Face ID/Touch ID/
  // fingerprint) is what releases it. Returns null if no master password
  // has ever been set up (nothing to seed it with).
  unlockWithBiometrics: async (): Promise<VaultKey | null> => {
    const vaultKeySerialized =
      await MasterPasswordRepository.getBiometricVaultKey();

    if (!vaultKeySerialized) {
      return null;
    }

    const key = await AESEncryptionKey.import(vaultKeySerialized, "base64");

    return { key, serialized: vaultKeySerialized };
  },

  // Re-wraps the same vault key under a new salt/master key, so changing
  // the password never touches (or needs to re-encrypt) stored credentials.
  changePassword: async ({
    currentPassword,
    newPassword,
  }: ChangePasswordInput) => {
    const { serialized: vaultKeySerialized } =
      await MasterPasswordService.unlock({ password: currentPassword });

    const salt = await KeyDerivationService.generateSalt();
    const saltBase64 = BinaryUtils.toBase64(salt);

    const masterKey = await deriveMasterKey(
      newPassword,
      saltBase64,
      DEFAULT_SCRYPT_PARAMS,
    );

    const wrappedVaultKeyBase64 = await wrapVaultKey(
      vaultKeySerialized,
      masterKey,
    );

    await MasterPasswordRepository.saveRecord({
      saltBase64,
      kdfParams: DEFAULT_SCRYPT_PARAMS,
      wrappedVaultKeyBase64,
    });
  },
};
