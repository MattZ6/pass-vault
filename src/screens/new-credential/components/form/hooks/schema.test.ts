import { describe, expect, test } from "bun:test";

import { newCredentialSchema } from "./schema";

const validCredential = {
  provider: "GitHub",
  website: "https://github.com",
  username: "octocat",
  password: "hunter2",
  notes: "Personal account",
};

describe("newCredentialSchema", () => {
  test("accepts a fully filled credential", () => {
    const result = newCredentialSchema.safeParse(validCredential);

    expect(result.success).toBe(true);
  });

  test("accepts a credential without the optional website/notes", () => {
    const { website, notes, ...rest } = validCredential;

    const result = newCredentialSchema.safeParse(rest);

    expect(result.success).toBe(true);
  });

  test("rejects an empty provider", () => {
    const result = newCredentialSchema.safeParse({
      ...validCredential,
      provider: "  ",
    });

    expect(result.success).toBe(false);
  });

  test("rejects an empty username", () => {
    const result = newCredentialSchema.safeParse({
      ...validCredential,
      username: "",
    });

    expect(result.success).toBe(false);
  });

  test("rejects an empty password", () => {
    const result = newCredentialSchema.safeParse({
      ...validCredential,
      password: "",
    });

    expect(result.success).toBe(false);
  });

  test("rejects a website that isn't a valid URL", () => {
    const result = newCredentialSchema.safeParse({
      ...validCredential,
      website: "not-a-url",
    });

    expect(result.success).toBe(false);
  });
});
