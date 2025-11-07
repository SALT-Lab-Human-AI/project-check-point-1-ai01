// Singleton initializer for the skip-gram adapter.
// Ensures the skip-gram model is initialized only once and shared across modules.

import type { SkipGramAdapter } from "./word_match_skipgram";

let adapterPromise: Promise<SkipGramAdapter | null> | null = null;

export function getSkipGramAdapter(): Promise<SkipGramAdapter | null> {
  if (adapterPromise) return adapterPromise;

  adapterPromise = (async () => {
    try {
      const mod = await import("./word_match_skipgram");
      if (mod && typeof mod.initSkipGram === "function") {
        const a = await mod.initSkipGram();
        console.info("Skip-gram adapter initialized.");
        return a;
      }
    } catch (e) {
      console.warn("Skip-gram adapter failed to initialize:", e);
    }
    return null;
  })();

  return adapterPromise;
}

export async function warmUpSkipGram(): Promise<void> {
  // Start initialization but don't await here if caller doesn't want to block.
  getSkipGramAdapter().catch(() => {});
}
