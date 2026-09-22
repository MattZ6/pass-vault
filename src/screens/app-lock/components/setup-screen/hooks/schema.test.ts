import { describe, expect, test } from "bun:test";

import { setupMasterPasswordSchema } from "./schema";

describe("setupMasterPasswordSchema", () => {
  test("accepts a matching password/confirmation pair of 8+ chars", () => {
    const result = setupMasterPasswordSchema.safeParse({
      password: "correcthorse",
      confirmPassword: "correcthorse",
    });

    expect(result.success).toBe(true);
  });

  test("rejects a password shorter than 8 characters", () => {
    const result = setupMasterPasswordSchema.safeParse({
      password: "short1",
      confirmPassword: "short1",
    });

    expect(result.success).toBe(false);
  });

  test("rejects when confirmPassword does not match password", () => {
    const result = setupMasterPasswordSchema.safeParse({
      password: "correcthorse",
      confirmPassword: "correcthorsebattery",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["confirmPassword"]);
    }
  });

  test("trims surrounding whitespace before validating length", () => {
    const result = setupMasterPasswordSchema.safeParse({
      password: "  correcthorse  ",
      confirmPassword: "  correcthorse  ",
    });

    expect(result.success).toBe(true);
  });
});
