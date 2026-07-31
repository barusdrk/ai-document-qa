interface GenerateAnswerOptions {
  question: string;
  context: string;
}

function summarizeContext(
  context: string
): string {
  const cleaned = context.trim();

  if (!cleaned) {
    return "No relevant document content was found.";
  }

  if (cleaned.length <= 800) {
    return cleaned;
  }

  return `${cleaned.slice(0, 800)}...`;
}

export async function generateAnswer({
  question,
  context,
}: GenerateAnswerOptions): Promise<string> {
  // Simulate an AI response delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  const summary =
    summarizeContext(context);

  return `# Mock AI Response

This answer is generated for demonstration purposes.

## Your Question

${question}

## Answer

Based on the uploaded document, the retrieved sections suggest the following:

${summary}

## Notes

• This is a simulated Large Language Model response.
• The document retrieval (RAG) pipeline is functioning normally.
• In the production version, the retrieved document chunks would be sent to OpenAI (or another LLM) to generate a natural-language answer grounded in the document.

Thank you for trying the AI Document Q&A demo!`;
}
