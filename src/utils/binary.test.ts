import { describe, expect, test } from "bun:test";

import { BinaryUtils } from "./binary";

describe("BinaryUtils", () => {
  test("toBase64/fromBase64 round-trip arbitrary bytes", () => {
    const bytes = new Uint8Array([0, 1, 2, 127, 128, 255]);

    const base64 = BinaryUtils.toBase64(bytes);
    const roundTripped = BinaryUtils.fromBase64(base64);

    expect(Array.from(roundTripped)).toEqual(Array.from(bytes));
  });

  test("toArrayBuffer/toUint8Array round-trip", () => {
    const bytes = new Uint8Array([10, 20, 30]);

    const buffer = BinaryUtils.toArrayBuffer(bytes);
    const backToBytes = BinaryUtils.toUint8Array(buffer);

    expect(Array.from(backToBytes)).toEqual(Array.from(bytes));
  });

  test("toArrayBuffer copies instead of sharing the original buffer", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const buffer = BinaryUtils.toArrayBuffer(bytes);

    bytes[0] = 99;

    expect(new Uint8Array(buffer)[0]).toBe(1);
  });

  describe("formatBytes", () => {
    test("formats 0 bytes", () => {
      expect(BinaryUtils.formatBytes(0)).toBe("0 bytes");
    });

    test("formats the singular 1 byte case", () => {
      expect(BinaryUtils.formatBytes(1)).toBe("0 byte");
    });

    test("formats bytes below 1024 with the bytes unit", () => {
      expect(BinaryUtils.formatBytes(512)).toBe("512 bytes");
    });

    test("formats kilobytes", () => {
      expect(BinaryUtils.formatBytes(2048)).toBe("2 Kb");
    });

    test("formats megabytes with default decimals", () => {
      expect(BinaryUtils.formatBytes(1.5 * 1024 * 1024)).toBe("1.5 Mb");
    });

    test("respects a custom decimals option", () => {
      expect(BinaryUtils.formatBytes(1.5 * 1024 * 1024, { decimals: 2 })).toBe(
        "1.50 Mb",
      );
    });
  });
});
