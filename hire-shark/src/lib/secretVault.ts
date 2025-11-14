import { base64ToArrayBuffer, decodeBase64ToString } from "./cryptoUtils";

type SharedSecrets = {
  geminiApiKey: string;
  adzunaAppId: string;
  adzunaAppKey: string;
};

type EncodedPayload = {
  version: number;
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
};

const PASSWORD_PROMPT =
  "Enter the shared password to unlock Gemini and Adzuna credentials. The password stays in memory for this tab only.";
const PASSWORD_ERROR =
  "Unable to decrypt the shared credentials. Verify the password or ask an administrator for the latest value.";
const MANUAL_PROMPT_GEMINI = "Enter your Gemini API key (kept in-memory for this tab only):";
const MANUAL_PROMPT_ADZUNA_ID = "Enter your Adzuna App ID (kept in-memory for this tab only):";
const MANUAL_PROMPT_ADZUNA_KEY = "Enter your Adzuna App Key (kept in-memory for this tab only):";

let cachedSecrets: SharedSecrets | null = null;

export async function getSharedSecrets(): Promise<SharedSecrets | null> {
  if (cachedSecrets) {
    return cachedSecrets;
  }

  const direct = readDirectEnvSecrets();
  if (direct) {
    cachedSecrets = direct;
    return cachedSecrets;
  }

  const encoded = (import.meta.env.VITE_ENCODED_SECRET || "").trim();
  if (encoded && supportsInteractivePrompts() && supportsCrypto()) {
    while (!cachedSecrets) {
      const password = promptForPassword();
      if (!password) {
        break;
      }
      try {
        cachedSecrets = await decryptEncodedSecrets(encoded, password);
        return cachedSecrets;
      } catch (error) {
        console.error("Failed to decrypt encoded secrets", error);
        notifyPasswordFailure();
      }
    }
  }

  if (supportsInteractivePrompts()) {
    cachedSecrets = promptForManualSecrets();
  }
  return cachedSecrets;
}

export function clearCachedSecrets(): void {
  cachedSecrets = null;
}

function readDirectEnvSecrets(): SharedSecrets | null {
  const gemini = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();
  const adzunaAppId = (import.meta.env.VITE_ADZUNA_APP_ID || "").trim();
  const adzunaAppKey = (import.meta.env.VITE_ADZUNA_APP_KEY || "").trim();
  if (gemini && adzunaAppId && adzunaAppKey) {
    return { geminiApiKey: gemini, adzunaAppId, adzunaAppKey };
  }
  return null;
}

function promptForPassword(): string | null {
  if (!supportsInteractivePrompts()) {
    return null;
  }
  const value = window.prompt(PASSWORD_PROMPT);
  return value?.trim() || null;
}

function notifyPasswordFailure(): void {
  if (!supportsAlerts()) return;
  window.alert(PASSWORD_ERROR);
}

function promptForManualSecrets(): SharedSecrets | null {
  const gemini = window.prompt(MANUAL_PROMPT_GEMINI)?.trim();
  const adzunaAppId = window.prompt(MANUAL_PROMPT_ADZUNA_ID)?.trim();
  const adzunaAppKey = window.prompt(MANUAL_PROMPT_ADZUNA_KEY)?.trim();
  if (gemini && adzunaAppId && adzunaAppKey) {
    return {
      geminiApiKey: gemini,
      adzunaAppId,
      adzunaAppKey,
    };
  }
  return null;
}

async function decryptEncodedSecrets(encoded: string, password: string): Promise<SharedSecrets> {
  const envelope = parseEncodedSecret(encoded);
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToArrayBuffer(envelope.salt),
      iterations: envelope.iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToArrayBuffer(envelope.iv),
    },
    derivedKey,
    base64ToArrayBuffer(envelope.ciphertext),
  );

  const parsed = JSON.parse(new TextDecoder().decode(decrypted)) as Partial<SharedSecrets>;
  if (!parsed.geminiApiKey || !parsed.adzunaAppId || !parsed.adzunaAppKey) {
    throw new Error("Decoded payload is missing required secrets.");
  }
  return {
    geminiApiKey: parsed.geminiApiKey,
    adzunaAppId: parsed.adzunaAppId,
    adzunaAppKey: parsed.adzunaAppKey,
  };
}

function parseEncodedSecret(encoded: string): EncodedPayload {
  const decoded = decodeBase64ToString(encoded);
  const payload = JSON.parse(decoded) as EncodedPayload;
  if (!payload || !payload.salt || !payload.iv || !payload.ciphertext || !payload.iterations) {
    throw new Error("Encoded secret is invalid.");
  }
  return payload;
}

function supportsInteractivePrompts(): boolean {
  return typeof window !== "undefined" && typeof window.prompt === "function";
}

function supportsAlerts(): boolean {
  return typeof window !== "undefined" && typeof window.alert === "function";
}

function supportsCrypto(): boolean {
  return typeof crypto !== "undefined" && Boolean(crypto.subtle);
}
