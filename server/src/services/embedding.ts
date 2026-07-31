function hashString(text: string): number {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash =
      (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  return hash;
}

function createMockEmbedding(
  text: string
): number[] {
  const seed = hashString(
    text.toLowerCase()
  );

  const embedding: number[] = [];

  for (let i = 0; i < 256; i++) {
    const value =
      Math.sin(seed + i * 17) * 10000;

    embedding.push(
      value - Math.floor(value)
    );
  }

  return embedding;
}

export async function createEmbedding(
  text: string
): Promise<number[]> {
  return createMockEmbedding(text);
}

export async function createEmbeddings(
  texts: string[]
): Promise<number[][]> {
  return Promise.all(
    texts.map(createEmbedding)
  );
}
