import { createEmbedding } from "./embedding.js";

import { searchDocument } from "./vectorStore.js";

import Document from "../models/Document.js";

export interface SearchResult {
  documentId: string;
  fileName: string;
  page: number;
  text: string;
  score: number;
}

export async function searchInDocument(
  ownerId: string,
  documentId: string,
  query: string,
  limit = 10
): Promise<SearchResult[]> {
  const trimmed =
    query.trim();

  if (!trimmed) {
    return [];
  }

  const document =
    await Document.findOne({
      _id: documentId,
      owner: ownerId,
    });

  if (!document) {
    throw new Error(
      "Document not found."
    );
  }

  const embedding =
    await createEmbedding(
      trimmed
    );

  const matches =
    searchDocument(
      ownerId,
      documentId,
      embedding,
      limit
    );

  return matches.map(
    (match) => ({
      documentId,

      fileName:
        document.fileName,

      page: match.page,

      text: match.text,

      score:
        match.similarity,
    })
  );
}
