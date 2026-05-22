import { CredentialsMetaRepository } from "@/repositories/credentials/meta.repository";
import { CredentialsSecretRepository } from "@/repositories/credentials/secret.repository";

import { CryptographyService } from "@/services/cryptography/cryptography";

import { useVaultStore } from "@/store/credentials/vault.store";

type CreateCredentialInput = {
  app: string;
  username: string;
  password: string;
};

export const VaultService = {
  createCredential: async (input: CreateCredentialInput) => {
    const id = CryptographyService.generateUUID();

    await CredentialsMetaRepository.saveMetadata({
      id,
      app: input.app,
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
      provider: input.app,
      username: input.username,
    });
  },
};
