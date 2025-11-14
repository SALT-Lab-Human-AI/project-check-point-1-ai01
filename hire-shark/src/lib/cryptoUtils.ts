declare const Buffer: {
  from(input: string, encoding?: string): { toString(encoding?: string): string };
} | undefined;

export function decodeBase64ToString(value: string): string {
  if (typeof globalThis.atob === "function") {
    return globalThis.atob(value);
  }
  if (typeof Buffer !== "undefined" && Buffer) {
    return Buffer.from(value, "base64").toString("utf-8");
  }
  throw new Error("Base64 decoding is not supported in this environment.");
}

export function base64ToArrayBuffer(value: string): ArrayBuffer {
  const binary = decodeBase64ToString(value);
  const length = binary.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

