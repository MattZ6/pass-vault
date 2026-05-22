export const BinaryUtils = {
  toArrayBuffer: (bytes: Uint8Array) => {
    return bytes.slice().buffer;
  },

  toUint8Array: (buffer: ArrayBuffer) => {
    return new Uint8Array(buffer);
  },
};
