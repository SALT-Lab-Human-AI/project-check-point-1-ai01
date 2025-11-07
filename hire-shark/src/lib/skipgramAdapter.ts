// Lightweight adapter shim so the rest of the app can call the same API even when
// TensorFlow.js is unavailable. Falling back to TF-IDF vectors happens upstream
// when this returns `null`.

export type SkipGramAdapter = {
  vectorizeText(text: string): number[];
  cosineSimilarity(a: number[], b: number[]): number;
};

export function getSkipGramAdapter(_corpus?: string[]): Promise<SkipGramAdapter | null> {
  console.info("Skip-gram adapter disabled: @tensorflow/tfjs not installed. Falling back to TF-IDF vectors.");
  return Promise.resolve(null);
}

export async function warmUpSkipGram(_corpus?: string[]): Promise<void> {
  // No-op. Included to preserve the public API.
}
