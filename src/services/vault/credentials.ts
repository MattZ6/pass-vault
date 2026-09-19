import { CredentialsMetaRepository } from "@/repositories/credentials/meta.repository";
import { CredentialsSecretRepository } from "@/repositories/credentials/secret.repository";
import { PreferencesRepository } from "@/repositories/preferences.repository";

import { CryptographyService } from "@/services/cryptography/cryptography";

import { useVaultStore } from "@/store/credentials/vault.store";

import { BinaryUtils } from "@/utils/binary";

type CreateCredentialInput = {
  provider: string;
  website?: string;
  username: string;
  password: string;
  notes?: string;
  updatedAt?: Date;
};

type GetPasswordInput = {
  credentialId: string;
};

type DeleteCredentialInput = {
  credentialId: string;
};

type UpdateCredentialUsernameInput = {
  credentialId: string;
  username: string;
};

type UpdateCredentialNotesInput = {
  credentialId: string;
  notes?: string;
};

type UpdateCredentialWebsiteInput = {
  credentialId: string;
  website?: string;
};

export const VaultService = {
  loadCredentialsIntoStore: async () => {
    const [
      credentialsMeta,
      metadataStorageSizeInBytes,
      secretStorageSizeInBytes,
      lastUpdateDate,
    ] = await Promise.all([
      CredentialsMetaRepository.getAllMetadata(),
      CredentialsMetaRepository.getSizeInBytes(),
      CredentialsSecretRepository.getSizeInBytes(),
      PreferencesRepository.getLastUpdateDate(),
    ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setupCredentialsMeta(credentialsMeta);
    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);

    if (lastUpdateDate) {
      useVaultStore.getState().setLastUpdateDate(lastUpdateDate);
    }
  },
  createCredential: async (input: CreateCredentialInput) => {
    const id = CryptographyService.generateUUID();
    const now = new Date();

    await CredentialsMetaRepository.saveMetadata({
      id,
      provider: input.provider,
      website: input.website,
      username: input.username,
      notes: input.notes,
      updatedAt: now,
    });

    const encryptedPassword = await CryptographyService.encrypt({
      value: input.password,
    });

    await CredentialsSecretRepository.saveSecret({
      id,
      encryptedBytes: BinaryUtils.toArrayBuffer(encryptedPassword),
    });

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().addCredentialMeta({
      id,
      provider: input.provider,
      website: input.website,
      username: input.username,
      notes: input.notes,
      updatedAt: now,
    });

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
  getPassword: async (input: GetPasswordInput) => {
    const encryptedBytes = await CredentialsSecretRepository.getSecret({
      id: input.credentialId,
    });

    if (!encryptedBytes) {
      throw new Error(
        `Password from credential ${input.credentialId} was not stored.`,
      );
    }

    const decryptedPassword = await CryptographyService.decrypt({
      encryptedBytes: BinaryUtils.toUint8Array(encryptedBytes),
    });

    return decryptedPassword;
  },
  deleteCredential: async (input: DeleteCredentialInput) => {
    const now = new Date();

    await CredentialsSecretRepository.deleteSecret({ id: input.credentialId });
    await CredentialsMetaRepository.deleteMetadata({ id: input.credentialId });

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().removeCredentialMeta({
      id: input.credentialId,
    });

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
  deleteAllCredentials: async () => {
    const now = new Date();

    await CredentialsSecretRepository.deleteAllSecrets();
    await CredentialsMetaRepository.deleteAllMetdata();

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().setupCredentialsMeta([]);

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
  updateCredentialEmail: async (input: UpdateCredentialUsernameInput) => {
    const metadata = await CredentialsMetaRepository.getMetadataById({
      id: input.credentialId,
    });

    if (!metadata) {
      return;
    }

    const isSameUsername =
      String(metadata.username).trim() === String(input.username).trim();

    if (isSameUsername) {
      return;
    }

    const now = new Date();

    metadata.username = input.username;
    metadata.updatedAt = now;

    await CredentialsMetaRepository.saveMetadata(metadata);

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().updateCredentialMeta(metadata);

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
  updateCredentialNotes: async (input: UpdateCredentialNotesInput) => {
    const metadata = await CredentialsMetaRepository.getMetadataById({
      id: input.credentialId,
    });

    if (!metadata) {
      return;
    }

    const isSameNotes =
      String(metadata.notes ?? "").trim() === String(input.notes ?? "").trim();

    if (isSameNotes) {
      return;
    }

    const now = new Date();

    metadata.notes = input.notes?.trim() || undefined;
    metadata.updatedAt = now;

    await CredentialsMetaRepository.saveMetadata(metadata);

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().updateCredentialMeta(metadata);

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
  updateCredentialWebsite: async (input: UpdateCredentialWebsiteInput) => {
    const metadata = await CredentialsMetaRepository.getMetadataById({
      id: input.credentialId,
    });

    if (!metadata) {
      return;
    }

    const isSameWebsite =
      String(metadata.website ?? "").trim() ===
      String(input.website ?? "").trim();

    if (isSameWebsite) {
      return;
    }

    const now = new Date();

    metadata.website = input.website?.trim() || undefined;
    metadata.updatedAt = now;

    await CredentialsMetaRepository.saveMetadata(metadata);

    PreferencesRepository.setLastUpdateDate(now);

    useVaultStore.getState().updateCredentialMeta(metadata);

    const [metadataStorageSizeInBytes, secretStorageSizeInBytes] =
      await Promise.all([
        CredentialsMetaRepository.getSizeInBytes(),
        CredentialsSecretRepository.getSizeInBytes(),
      ]);

    const sizeInBytes = metadataStorageSizeInBytes + secretStorageSizeInBytes;

    useVaultStore.getState().setStorageSizeInBytes(sizeInBytes);
    useVaultStore.getState().setLastUpdateDate(now);
  },
};
