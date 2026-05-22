import { CredentialsMetaRepository } from "@/repositories/credentials/meta.repository";
import { CredentialsSecretRepository } from "@/repositories/credentials/secret.repository";

import { CryptographyService } from "@/services/cryptography/cryptography";

import { useVaultStore } from "@/store/credentials/vault.store";

type CreateCredentialInput = {
  provider: string;
  username: string;
  password: string;
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
      encryptedBytes: encryptedPassword,
    });

    useVaultStore.getState().addCredentialMeta({
      id,
      provider: input.provider,
      username: input.username,
    });
  },
};
