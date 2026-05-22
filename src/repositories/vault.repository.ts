import * as ExpoSecureStore from "expo-secure-store";

const KEYS = {
  VAULT: "vault.encription.key",
};

type SaveKeyInput = {
  encryptedKey: string;
};

export const VaultRepository = {
  getKey: async () => {
    return ExpoSecureStore.getItemAsync(KEYS.VAULT, {
      requireAuthentication: false,
    });
  },
  saveKey: async (input: SaveKeyInput) => {
    await ExpoSecureStore.setItemAsync(KEYS.VAULT, input.encryptedKey, {
      requireAuthentication: false,
    });
  },
};
