import { beforeAll, beforeEach, describe, expect, test } from "bun:test";

import { installNativeCryptoMocks } from "@/test/mocks/native-crypto";
import {
  installRepositoryMocks,
  resetRepositoryMocks,
} from "@/test/mocks/repositories";

beforeAll(() => {
  installNativeCryptoMocks();
  installRepositoryMocks();
});

beforeEach(async () => {
  resetRepositoryMocks();

  const { VaultKeyService } = await import("@/services/vault/key");
  VaultKeyService.clearVaultKey();
});

describe("MasterPasswordService", () => {
  test("hasMasterPassword is false before setup", async () => {
    const { MasterPasswordService } = await import("./master-password");

    expect(await MasterPasswordService.hasMasterPassword()).toBe(false);
  });

  test("hasMasterPassword is true after setup", async () => {
    const { MasterPasswordService } = await import("./master-password");

    await MasterPasswordService.setup({ password: "correct horse battery" });

    expect(await MasterPasswordService.hasMasterPassword()).toBe(true);
  });

  test("unlock with the password used at setup succeeds", async () => {
    const { MasterPasswordService } = await import("./master-password");

    await MasterPasswordService.setup({ password: "correct horse battery" });
    const vaultKey = await MasterPasswordService.unlock({
      password: "correct horse battery",
    });

    expect(vaultKey.serialized).toBeTruthy();
  });

  test("unlock preserves the same vault key that was set up (credentials stay decryptable)", async () => {
    const { MasterPasswordService } = await import("./master-password");

    const setupKey = await MasterPasswordService.setup({
      password: "correct horse battery",
    });
    const unlockedKey = await MasterPasswordService.unlock({
      password: "correct horse battery",
    });

    expect(unlockedKey.serialized).toBe(setupKey.serialized);
  });

  test("unlock with the wrong password throws IncorrectMasterPasswordError", async () => {
    const { MasterPasswordService, IncorrectMasterPasswordError } =
      await import("./master-password");

    await MasterPasswordService.setup({ password: "correct horse battery" });

    await expect(
      MasterPasswordService.unlock({ password: "wrong password" }),
    ).rejects.toBeInstanceOf(IncorrectMasterPasswordError);
  });

  test("unlock before any setup rejects", async () => {
    const { MasterPasswordService } = await import("./master-password");

    await expect(
      MasterPasswordService.unlock({ password: "anything" }),
    ).rejects.toThrow();
  });

  describe("changePassword", () => {
    test("allows unlocking with the new password afterwards", async () => {
      const { MasterPasswordService } = await import("./master-password");

      await MasterPasswordService.setup({ password: "old password" });
      await MasterPasswordService.changePassword({
        currentPassword: "old password",
        newPassword: "new password",
      });

      const vaultKey = await MasterPasswordService.unlock({
        password: "new password",
      });

      expect(vaultKey.serialized).toBeTruthy();
    });

    test("rejects the old password afterwards", async () => {
      const { MasterPasswordService, IncorrectMasterPasswordError } =
        await import("./master-password");

      await MasterPasswordService.setup({ password: "old password" });
      await MasterPasswordService.changePassword({
        currentPassword: "old password",
        newPassword: "new password",
      });

      await expect(
        MasterPasswordService.unlock({ password: "old password" }),
      ).rejects.toBeInstanceOf(IncorrectMasterPasswordError);
    });

    test("preserves the vault key across the password change", async () => {
      const { MasterPasswordService } = await import("./master-password");

      const setupKey = await MasterPasswordService.setup({
        password: "old password",
      });
      await MasterPasswordService.changePassword({
        currentPassword: "old password",
        newPassword: "new password",
      });
      const unlockedKey = await MasterPasswordService.unlock({
        password: "new password",
      });

      expect(unlockedKey.serialized).toBe(setupKey.serialized);
    });

    test("rejects when the current password is wrong", async () => {
      const { MasterPasswordService, IncorrectMasterPasswordError } =
        await import("./master-password");

      await MasterPasswordService.setup({ password: "old password" });

      await expect(
        MasterPasswordService.changePassword({
          currentPassword: "not the old password",
          newPassword: "new password",
        }),
      ).rejects.toBeInstanceOf(IncorrectMasterPasswordError);
    });
  });

  describe("unlockWithBiometrics", () => {
    test("returns null when no master password has ever been set up", async () => {
      const { MasterPasswordService } = await import("./master-password");

      expect(await MasterPasswordService.unlockWithBiometrics()).toBeNull();
    });

    test("returns the vault key after a password unlock has seeded it", async () => {
      const { MasterPasswordService } = await import("./master-password");

      const setupKey = await MasterPasswordService.setup({
        password: "correct horse battery",
      });

      const biometricKey = await MasterPasswordService.unlockWithBiometrics();

      expect(biometricKey?.serialized).toBe(setupKey.serialized);
    });
  });
});
