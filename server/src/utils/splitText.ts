import type {
  ExtractedPage,
} from "../services/extractText.js";

export interface TextChunk {
  page: number;
  text: string;
}

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export function splitText(
  pages: ExtractedPage[]
): TextChunk[] {
  const chunks: TextChunk[] = [];

  for (const page of pages) {
    const cleaned = page.text
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    let start = 0;

    while (
      start < cleaned.length
    ) {
      const end = Math.min(
        start + CHUNK_SIZE,
        cleaned.length
      );

      chunks.push({
        page: page.page,

        text: cleaned
          .slice(start, end)
          .trim(),
      });

      start +=
        CHUNK_SIZE -
        CHUNK_OVERLAP;
    }
  }

  return chunks;
}
