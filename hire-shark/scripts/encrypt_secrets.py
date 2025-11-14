import base64
import json
import os
from getpass import getpass
from hashlib import pbkdf2_hmac
from pathlib import Path
from secrets import token_bytes

try:
  from cryptography.hazmat.primitives.ciphers.aead import AESGCM
except ImportError as error:
  raise SystemExit("The 'cryptography' package is required. Install it with 'pip install cryptography'.") from error

REPO_ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = REPO_ROOT / ".env"
ITERATIONS = 200_000


def load_env_variables() -> dict[str, str]:
  if not ENV_PATH.exists():
    raise SystemExit(f".env file not found at {ENV_PATH}")

  env_values: dict[str, str] = {}
  with ENV_PATH.open("r", encoding="utf-8") as env_file:
    for raw_line in env_file:
      line = raw_line.strip()
      if not line or line.startswith("#") or "=" not in line:
        continue
      key, value = line.split("=", 1)
      env_values[key.strip()] = value.strip().strip('"').strip("'")
  return env_values


def build_plaintext(env_values: dict[str, str]) -> bytes:
  required = ["VITE_GEMINI_API_KEY", "VITE_ADZUNA_APP_ID", "VITE_ADZUNA_APP_KEY"]
  missing = [key for key in required if not env_values.get(key)]
  if missing:
    joined = ", ".join(missing)
    raise SystemExit(f"Missing required values in .env: {joined}")

  secret_payload = {
    "geminiApiKey": env_values["VITE_GEMINI_API_KEY"],
    "adzunaAppId": env_values["VITE_ADZUNA_APP_ID"],
    "adzunaAppKey": env_values["VITE_ADZUNA_APP_KEY"],
  }
  return json.dumps(secret_payload, separators=(",", ":")).encode("utf-8")


def derive_key(password: str, salt: bytes) -> bytes:
  return pbkdf2_hmac("sha256", password.encode("utf-8"), salt, ITERATIONS, dklen=32)


def encrypt_payload(password: str, plaintext: bytes) -> dict[str, str | int]:
  salt = token_bytes(16)
  iv = token_bytes(12)
  key = derive_key(password, salt)
  aesgcm = AESGCM(key)
  ciphertext = aesgcm.encrypt(iv, plaintext, None)
  return {
    "version": 1,
    "iterations": ITERATIONS,
    "salt": base64.b64encode(salt).decode("utf-8"),
    "iv": base64.b64encode(iv).decode("utf-8"),
    "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
  }


def main() -> None:
  env_values = load_env_variables()
  plaintext = build_plaintext(env_values)
  password = getpass("Enter the shared password to protect your API keys: ").strip()
  if not password:
    raise SystemExit("Password is required to encrypt secrets.")

  payload = encrypt_payload(password, plaintext)
  encoded_secret = base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")

  os.system("cls" if os.name == "nt" else "clear")
  print("=== HireShark Secret Vault ===")
  print("Password (share securely with trusted testers):")
  print(password)
  print("\nEncoded secret (store in repo secret VITE_ENCODED_SECRET and local .env as VITE_ENCODED_SECRET):")
  print(encoded_secret)
  print("\nReminder: remove plain-text API keys from .env when you're done.")


if __name__ == "__main__":
  main()
