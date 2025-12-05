// Simple TF-IDF vectorizer and cosine similarity utilities.
// Designed to be a compact, browser-friendly fallback embedding implementation.

function normalizeText(text: string): string {
  return (text || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string): string[] {
  const t = normalizeText(text);
  if (!t) return [];
  return t.split(' ');
}

export type Vectorizer = {
  vocabulary: string[];
  idf: number[];
  vectorize(text: string): number[];
};

export function buildVectorizer(corpus: string[]): Vectorizer {
  const docs = corpus.map(d => tokenize(d));
  const dfMap: Map<string, number> = new Map();

  for (const doc of docs) {
    const seen = new Set<string>();
    for (const token of doc) {
      if (!seen.has(token)) {
        seen.add(token);
        dfMap.set(token, (dfMap.get(token) || 0) + 1);
      }
    }
  }

  const vocabulary = Array.from(dfMap.keys()).sort();
  const N = Math.max(1, corpus.length);
  const idf = vocabulary.map(term => {
    const df = dfMap.get(term) || 0;
    // smooth idf
    return Math.log(1 + N / (1 + df));
  });

  function vectorize(text: string): number[] {
    const tokens = tokenize(text);
    if (tokens.length === 0) return new Array(vocabulary.length).fill(0);

    const tf: Map<string, number> = new Map();
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);

    const vec = new Array<number>(vocabulary.length).fill(0);
    for (let i = 0; i < vocabulary.length; i++) {
      const term = vocabulary[i];
      const termTf = tf.get(term) || 0;
      if (termTf > 0) {
        vec[i] = termTf * idf[i];
      }
    }

    // L2 normalize
    let norm = 0;
    for (const v of vec) norm += v * v;
    norm = Math.sqrt(norm);
    if (norm === 0) return vec;
    for (let i = 0; i < vec.length; i++) vec[i] = vec[i] / norm;
    return vec;
  }

  return { vocabulary, idf, vectorize };
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return dot / denom;
}

export default { buildVectorizer, cosineSimilarity };
