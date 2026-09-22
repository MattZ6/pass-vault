import { describe, expect, test } from "bun:test";

import { changeMasterPasswordSchema } from "./schema";

describe("changeMasterPasswordSchema", () => {
  test("accepts a valid change with matching new password", () => {
    const result = changeMasterPasswordSchema.safeParse({
      currentPassword: "oldpassword",
      newPassword: "newpassword1",
      confirmNewPassword: "newpassword1",
    });

    expect(result.success).toBe(true);
  });

  test("rejects an empty current password", () => {
    const result = changeMasterPasswordSchema.safeParse({
      currentPassword: "",
      newPassword: "newpassword1",
      confirmNewPassword: "newpassword1",
    });

    expect(result.success).toBe(false);
  });

  test("rejects a new password shorter than 8 characters", () => {
    const result = changeMasterPasswordSchema.safeParse({
      currentPassword: "oldpassword",
      newPassword: "short1",
      confirmNewPassword: "short1",
    });

    expect(result.success).toBe(false);
  });

  test("rejects when confirmNewPassword does not match newPassword", () => {
    const result = changeMasterPasswordSchema.safeParse({
      currentPassword: "oldpassword",
      newPassword: "newpassword1",
      confirmNewPassword: "somethingelse1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["confirmNewPassword"]);
    }
  });
});
