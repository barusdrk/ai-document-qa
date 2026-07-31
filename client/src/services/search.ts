import {
  searchDocument,
  type SearchResult,
} from "./api";

export async function searchInDocument(
  documentId: string,
  query: string
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const response =
    await searchDocument(
      documentId,
      query.trim()
    );

  return response.matches;
}
