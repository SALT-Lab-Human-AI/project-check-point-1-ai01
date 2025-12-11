// Lightweight skip-gram-inspired adapter backed by TensorFlow.js.
// Uses hashed character n-grams + IDF weighting for a compact semantic vector.
// If TFJS is unavailable, upstream falls back to TF-IDF.

export type SkipGramAdapter = {
  vectorizeText(text: string): number[];
  cosineSimilarity(a: number[], b: number[]): number;
};

const EMBED_DIM = 256;

export async function getSkipGramAdapter(corpus: string[] = []): Promise<SkipGramAdapter | null> {
  let tf: typeof import("@tensorflow/tfjs") | null = null;
  try {
    tf = await import("@tensorflow/tfjs");
  } catch (error) {
    console.info("Skip-gram adapter unavailable: @tensorflow/tfjs not installed.", error);
    return null;
  }

  const idf = buildIdfWeights(corpus);

  const vectorizeText = (text: string): number[] => {
    const indices = extractNgramIndices(text);
    if (!indices.length) return new Array(EMBED_DIM).fill(0);

    const vec = new Float32Array(EMBED_DIM);
    for (const idx of indices) {
      vec[idx] += idf[idx];
    }

    const tensor = tf!.tensor1d(vec);
    const norm = tf!.norm(tensor);
    const normVal = norm.dataSync()[0];
    if (normVal === 0) {
      tf!.dispose([tensor, norm]);
      return Array.from(vec);
    }
    const normalized = tf!.div(tensor, norm);
    const out = Array.from(normalized.dataSync());
    tf!.dispose([tensor, norm, normalized]);
    return out;
  };

  const cosineSimilarity = (a: number[], b: number[]): number => {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length || a.length === 0) return 0;
    return tf!.tidy(() => {
      const ta = tf!.tensor1d(a);
      const tb = tf!.tensor1d(b);
      const denom = tf!.mul(tf!.norm(ta), tf!.norm(tb));
      const denomVal = denom.dataSync()[0];
      if (denomVal === 0) {
        return 0;
      }
      const dot = tf!.dot(ta, tb).dataSync()[0];
      return dot / denomVal;
    });
  };

  return { vectorizeText, cosineSimilarity };
}

export async function warmUpSkipGram(corpus: string[] = []): Promise<void> {
  await getSkipGramAdapter(corpus);
}

function normalizeText(text: string): string {
  return (text || "").toLowerCase().replace(/[^a-z0-9+#/.\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function extractNgramIndices(text: string): number[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  const tokens = normalized.split(" ").filter(Boolean);
  const indices: number[] = [];
  for (const token of tokens) {
    indices.push(hashToDim(token));
    const chars = token.split("");
    if (chars.length >= 3) {
      for (let i = 0; i <= chars.length - 3; i++) {
        const ngram = chars.slice(i, i + 3).join("");
        indices.push(hashToDim(ngram));
      }
    }
  }
  return indices;
}

function hashToDim(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % EMBED_DIM;
}

function buildIdfWeights(corpus: string[]): Float32Array {
  const df = new Uint32Array(EMBED_DIM);
  const totalDocs = Math.max(1, corpus.length);
  for (const doc of corpus) {
    const seen = new Set<number>();
    for (const idx of extractNgramIndices(doc)) {
      seen.add(idx);
    }
    for (const idx of seen) {
      df[idx] += 1;
    }
  }
  const idf = new Float32Array(EMBED_DIM);
  for (let i = 0; i < EMBED_DIM; i++) {
    idf[i] = Math.log(1 + totalDocs / (1 + df[i]));
  }
  return idf;
}
