import { createEmbedding } from "./embedding.js";
import { searchDocument } from "./vectorStore.js";
import { generateAnswer } from "./ai.js";

export async function answerQuestion(
  ownerId: string,
  documentId: string,
  question: string
) {
  const questionEmbedding =
    await createEmbedding(question);

  const chunks = searchDocument(
    ownerId,
    documentId,
    questionEmbedding,
    5
  );

  if (chunks.length === 0) {
    return {
      answer:
        "No relevant information was found in the selected document.",
      sources: [],
    };
  }

  const context = chunks
    .map(
      (chunk) =>
        `Page ${chunk.page}

  ${chunk.text}`
    )
    .join("\n\n");

  const answer =
    await generateAnswer({
      question,
      context,
    });

  return {
    answer,
    sources: chunks.map(
      (chunk) => ({
        page: chunk.page,
        text: chunk.text,
      })
    ),
  };
}
