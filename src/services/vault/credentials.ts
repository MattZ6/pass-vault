import { CredentialsMetaRepository } from "@/repositories/credentials/meta.repository";
import { CredentialsSecretRepository } from "@/repositories/credentials/secret.repository";

import { CryptographyService } from "@/services/cryptography/cryptography";

import { useVaultStore } from "@/store/credentials/vault.store";

import { BinaryUtils } from "@/utils/binary";

type CreateCredentialInput = {
  provider: string;
  website?: string;
  username: string;
  password: string;
  notes?: string;
};

type GetPasswordInput = {
  credentialId: string;
};

type DeleteCredentialInput = {
  credentialId: string;
};

export const VaultService = {
  loadCredentialsIntoStore: async () => {
    const credentialsMeta = await CredentialsMetaRepository.getAllMetadata();

    useVaultStore.getState().setupCredentialsMeta(credentialsMeta);
  },
  createCredential: async (input: CreateCredentialInput) => {
    const id = CryptographyService.generateUUID();

    await CredentialsMetaRepository.saveMetadata({
      id,
      provider: input.provider,
      username: input.username,
    });

    const encryptedPassword = await CryptographyService.encrypt({
      value: input.password,
    });

    await CredentialsSecretRepository.saveSecret({
      id,
      encryptedBytes: BinaryUtils.toArrayBuffer(encryptedPassword),
    });

    useVaultStore.getState().addCredentialMeta({
      id,
      provider: input.provider,
      username: input.username,
    });
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
    await CredentialsSecretRepository.deleteSecret({ id: input.credentialId });
    await CredentialsMetaRepository.deleteMetadata({ id: input.credentialId });

    useVaultStore.getState().removeCredentialMeta({
      id: input.credentialId,
    });
  },
};
