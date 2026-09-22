import { describe, expect, test } from "bun:test";

import { DateUtils } from "./date";

describe("DateUtils", () => {
  test("toDate parses a date-only string at local midnight", () => {
    const date = DateUtils.toDate("2026-09-22");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(8); // 0-indexed: September
    expect(date.getDate()).toBe(22);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
  });

  describe("formatDate", () => {
    const date = new Date(2026, 8, 22);

    test("includes the year by default", () => {
      const formatted = DateUtils.formatDate(date, { language: "en-US" });

      expect(formatted).toContain("2026");
      expect(formatted).toContain("22");
    });

    test("hides the year when hideYear is true", () => {
      const formatted = DateUtils.formatDate(date, {
        language: "en-US",
        hideYear: true,
      });

      expect(formatted).not.toContain("2026");
    });

    test("formats using the given locale", () => {
      const enFormatted = DateUtils.formatDate(date, { language: "en-US" });
      const ptFormatted = DateUtils.formatDate(date, { language: "pt-BR" });

      expect(enFormatted).not.toBe(ptFormatted);
    });
  });

  describe("formatDateTime", () => {
    const date = new Date(2026, 8, 22, 14, 30);

    test("includes both date and time components", () => {
      const formatted = DateUtils.formatDateTime(date, { language: "en-US" });

      expect(formatted).toContain("2026");
      expect(formatted).toContain("22");
      expect(formatted).toMatch(/2:30|14:30/);
    });

    test("hides the year when hideYear is true", () => {
      const formatted = DateUtils.formatDateTime(date, {
        language: "en-US",
        hideYear: true,
      });

      expect(formatted).not.toContain("2026");
    });
  });
});
