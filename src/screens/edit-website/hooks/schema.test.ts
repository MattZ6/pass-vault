import { describe, expect, test } from "bun:test";

import { editCredentialWebsiteSchema } from "./schema";

describe("editCredentialWebsiteSchema", () => {
  test("accepts a valid URL", () => {
    const result = editCredentialWebsiteSchema.safeParse({
      website: "https://example.com",
    });

    expect(result.success).toBe(true);
  });

  test("accepts an empty string (website is optional)", () => {
    const result = editCredentialWebsiteSchema.safeParse({ website: "" });

    expect(result.success).toBe(true);
  });

  test("accepts a missing website field", () => {
    const result = editCredentialWebsiteSchema.safeParse({});

    expect(result.success).toBe(true);
  });

  test("rejects a non-empty value that isn't a valid URL", () => {
    const result = editCredentialWebsiteSchema.safeParse({
      website: "not-a-url",
    });

    expect(result.success).toBe(false);
  });
});
