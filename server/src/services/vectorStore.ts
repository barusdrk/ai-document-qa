import type { TextChunk } from "../types/textChunk.js";

interface Chunk
  extends TextChunk {
  embedding: number[];
}

interface StoredChunk
  extends Chunk {
  ownerId: string;
  documentId: string;
}

const store =
  new Map<
    string,
    StoredChunk[]
  >();

/*
 * Cosine similarity
 */
function cosineSimilarity(
  a: number[],
  b: number[]
): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (
    let i = 0;
    i < a.length;
    i++
  ) {
    dot += a[i] * b[i];

    normA += a[i] * a[i];

    normB += b[i] * b[i];
  }

  return (
    dot /
    (Math.sqrt(normA) *
      Math.sqrt(normB))
  );
}

/*
 * Store chunks
 */
export function storeDocument(
  ownerId: string,
  documentId: string,
  chunks: Chunk[]
) {
  const key =
    `${ownerId}:${documentId}`;

  const stored =
    chunks.map(
      (chunk) => ({
        ...chunk,
        ownerId,
        documentId,
      })
    );

  store.set(key, stored);
}

/*
 * Delete document
 */
export function deleteDocument(
  ownerId: string,
  documentId: string
) {
  store.delete(
    `${ownerId}:${documentId}`
  );
}

/*
 * List document ids
 */
export function listDocuments(
  ownerId: string
): string[] {
  return [...store.keys()]
    .filter((key) =>
      key.startsWith(
        `${ownerId}:`
      )
    )
    .map(
      (key) =>
        key.split(":")[1]
    );
}

/*
 * Semantic search
 */
export function searchDocument(
  ownerId: string,
  documentId: string,
  embedding: number[],
  limit = 5
) {
  const chunks =
    store.get(
      `${ownerId}:${documentId}`
    ) ?? [];

  return chunks
    .map((chunk) => ({
      ...chunk,

      similarity:
        cosineSimilarity(
          embedding,
          chunk.embedding
        ),
    }))
    .sort(
      (a, b) =>
        b.similarity -
        a.similarity
    )
    .slice(0, limit);
}

/*
 * Keyword search
 */
export function keywordSearch(
  ownerId: string,
  documentId: string,
  query: string
) {
  const q =
    query.toLowerCase();

  const chunks =
    store.get(
      `${ownerId}:${documentId}`
    ) ?? [];

  return chunks.filter(
    (chunk) =>
      chunk.text
        .toLowerCase()
        .includes(q)
  );
}

/*
 * Document statistics
 */
export function getDocumentStats(
  ownerId: string
) {
  let documents = 0;
  let chunks = 0;

  for (const [
    key,
    value,
  ] of store.entries()) {
    if (
      key.startsWith(
        `${ownerId}:`
      )
    ) {
      documents++;

      chunks += value.length;
    }
  }

  return {
    documents,
    chunks,
  };
}

/*
 * Clear everything
 */
export function clearStore() {
  store.clear();
}
