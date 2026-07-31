export interface DocumentChunk {
  page: number;
  text: string;
  embedding: number[];
}

export interface Source {
  page: number;
  text: string;
}

export interface AskResponse {
  answer: string;
  sources: Source[];
}

export interface StoredDocument {
  id: string;
  chunks: DocumentChunk[];
}
