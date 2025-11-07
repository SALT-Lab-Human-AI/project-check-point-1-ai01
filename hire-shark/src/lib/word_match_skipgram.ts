// This module trains a tiny skip-gram model and exposes an async initializer
// that returns `vectorizeText` and `cosineSimilarity` functions.

export type SkipGramAdapter = {
  vectorizeText(text: string): number[];
  cosineSimilarity(a: number[], b: number[]): number;
};

export async function initSkipGram(): Promise<SkipGramAdapter> {
  // Dynamically import tfjs here to avoid build-time resolution errors when
  // tfjs isn't installed. The dynamic import will only run if initSkipGram is called.
  // Dynamically import tfjs. Use ts-ignore so type checker doesn't require tfjs types to be installed.
  // @ts-ignore
  const tf: any = await import("@tensorflow/tfjs");

  // -----------------------------
  // Example corpus (small demo set). In practice you can replace or extend this.
  // -----------------------------
  const corpus: string[] = [
    "data engineer python sql aws",
    "frontend developer react typescript css",
    "machine learning engineer python tensorflow",
    "product manager agile scrum leadership communication",
  ];

  const tokenize = (text: string): string[] => text.toLowerCase().split(/\s+/).filter(Boolean);

  // Build vocabulary
  const tokens: string[] = Array.from(new Set(corpus.flatMap(tokenize)));
  const word2idx: Record<string, number> = Object.fromEntries(tokens.map((w, i) => [w, i]));
  const vocabSize = tokens.length;
  const EMBED_DIM = 32;

  // Create skip-gram training pairs
  const windowSize = 2;
  const pairs: [number, number][] = [];

  for (const sentence of corpus) {
    const words = tokenize(sentence);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const targetIdx = word2idx[word];
      if (targetIdx === undefined) continue;

      for (let j = Math.max(0, i - windowSize); j <= Math.min(words.length - 1, i + windowSize); j++) {
        if (i === j) continue;
        const contextWord = words[j];
        const contextIdx = word2idx[contextWord];
        if (contextIdx === undefined) continue;
        pairs.push([targetIdx, contextIdx]);
      }
    }
  }

  // Build model
  const inputTarget = tf.input({ shape: [1], dtype: "int32" });
  const inputContext = tf.input({ shape: [1], dtype: "int32" });

  const embedding = tf.layers.embedding({ inputDim: vocabSize, outputDim: EMBED_DIM, inputLength: 1 });
  const targetEmbedding = embedding.apply(inputTarget) as any;
  const contextEmbedding = embedding.apply(inputContext) as any;

  const dotProduct = tf.layers.dot({ axes: -1 }).apply([targetEmbedding, contextEmbedding]) as any;
  const flattened = tf.layers.flatten().apply(dotProduct) as any;
  const output = tf.layers.activation({ activation: "sigmoid" }).apply(flattened) as any;

  const model = tf.model({ inputs: [inputTarget, inputContext], outputs: output });
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });

  // Prepare tensors
  const targets = tf.tensor2d(pairs.map((p) => [p[0]]), [pairs.length, 1], "int32");
  const contexts = tf.tensor2d(pairs.map((p) => [p[1]]), [pairs.length, 1], "int32");
  const labels = tf.tensor2d(new Array(pairs.length).fill([1]), [pairs.length, 1], "float32");

  // Train (small number of epochs for demo)
  await model.fit([targets, contexts], labels, { epochs: 50, verbose: 0 });

  // Extract embeddings
  const embeddingLayer = model.layers.find((l: any) => l.getClassName() === "Embedding") as any;
  const weightsTensor = embeddingLayer.getWeights()[0];
  const weights = await weightsTensor.array() as number[][];

  function vectorizeText(text: string): number[] {
    const words = tokenize(text);
    const indices = words.map((w) => word2idx[w]).filter((i): i is number => i !== undefined);
    if (indices.length === 0) return new Array(EMBED_DIM).fill(0);
    const vectors = indices.map((i) => weights[i]);

    const dim = (weights[0] && weights[0].length) ? weights[0].length : EMBED_DIM;
    const sum = new Array(dim).fill(0);
    for (const v of vectors) {
      for (let i = 0; i < dim; i++) {
        sum[i] += (v && v[i]) ? v[i] : 0;
      }
    }
    return sum.map((s) => s / vectors.length);
  }

  function cosineSimilarity(a: number[], b: number[]): number {
    const len = Math.min(a.length, b.length);
    let dot = 0;
    for (let i = 0; i < len; i++) {
      const ai = a[i] ?? 0;
      const bi = b[i] ?? 0;
      dot += ai * bi;
    }
    const normA = Math.sqrt(a.reduce((sum, ai) => sum + (ai ?? 0) ** 2, 0));
    const normB = Math.sqrt(b.reduce((sum, bi) => sum + (bi ?? 0) ** 2, 0));
    return normA && normB ? dot / (normA * normB) : 0;
  }

  return { vectorizeText, cosineSimilarity };
}

