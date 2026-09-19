export const BinaryUtils = {
  toArrayBuffer: (bytes: Uint8Array) => {
    return bytes.slice().buffer;
  },

  toUint8Array: (buffer: ArrayBuffer) => {
    return new Uint8Array(buffer);
  },

  toBase64: (bytes: Uint8Array) => {
    let binary = "";

    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }

    return btoa(binary);
  },

  fromBase64: (base64: string) => {
    const binary = atob(base64);

    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  },

  formatBytes: (
    bytes: number,
    options?: {
      decimals?: number;
    },
  ): string => {
    if (bytes === 0) {
      return "0 bytes";
    }

    if (bytes === 1) {
      return "0 byte";
    }

    const decimals = options?.decimals ?? 1;
    const units = ["bytes", "Kb", "Mb", "Gb", "Tb"];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / 1024 ** index;

    const formattedValue = Number.isInteger(value)
      ? value.toString()
      : value.toFixed(decimals);

    return `${formattedValue} ${units[index]}`;
  },
};
