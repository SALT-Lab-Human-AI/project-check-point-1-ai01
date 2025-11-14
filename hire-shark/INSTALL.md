# HireShark Installation Guide

Follow these steps to run the HireShark web app locally.

## 1. Prerequisites
- Node.js 18.x (LTS) or newer. Use [nvm](https://github.com/nvm-sh/nvm) if you manage multiple versions.
- npm 9+ (ships with Node 18).
- (Optional) Git, if you plan to clone and contribute.

You can verify your versions:
```sh
node -v
npm -v
```

## 2. Install dependencies
From the project root:
```sh
cd hire-shark
npm install
```
This downloads the Vite/React/shadcn UI dependencies listed in `package.json`.

## 3. Configure environment variables
Copy `.env.example` to `.env`:
```sh
cp .env.example .env
```
Then choose one of the following:
- **Shared vault workflow (recommended):** leave the plain-text entries empty and add `VITE_ENCODED_SECRET` with the output of `scripts/encrypt_secrets.py`.
- **Direct keys (local dev only):** set `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, and `VITE_ADZUNA_APP_KEY`. These values are only used for encryption or manual overrides; do not commit them.

Restart any running dev server after changing `.env`.

## 4. Encrypt Gemini + Adzuna keys (shared testing)
1. Install Python 3.9+ plus the `cryptography` package (`pip install cryptography`).
2. Ensure `.env` contains `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, and `VITE_ADZUNA_APP_KEY`.
3. Run `python scripts/encrypt_secrets.py` and enter a strong shared password when prompted.
4. Copy the printed password for trusted testers and store the encoded string as `VITE_ENCODED_SECRET` locally + as the GitHub secret `ENCODED_SECRET`.
5. Remove the plain-text keys from `.env` after generating the blob.

During runtime the browser prompts for the shared password, decrypts the blob entirely in memory, and uses the recovered API keys. Users without the password can still enter their own keys when prompted.

## 5. Start the dev server
Run Vite in watch mode:
```sh
npm run dev
```
Open the printed URL (default `http://localhost:8080`). The app uses client-side routing, so navigate through Upload -> Review -> Preferences -> Matches to exercise the flow.

## 6. Build for production (optional)
```sh
npm run build
```
Artifacts land in `hire-shark/dist`.

The production build needs the `project-check-point-1-ai01` suffix path to access corresponding pages correctly.

## 7. Troubleshooting tips
- **Blank matches page**: confirm `.env` values are set and the browser console shows Adzuna requests succeeding.
- **Resume parsing fails**: ensure the shared password was entered correctly, that `VITE_ENCODED_SECRET` is valid, or paste a personal Gemini/Adzuna key when prompted.
