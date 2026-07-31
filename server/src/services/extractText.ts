import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export interface ExtractedPage {
  page: number;
  text: string;
}

export interface ExtractedDocument {
  pages: ExtractedPage[];
  pageCount: number;
}

export async function extractText(
  file: Express.Multer.File
): Promise<ExtractedDocument> {
  const extension = file.originalname
    .split(".")
    .pop()
    ?.toLowerCase();

  const mime = file.mimetype;

  if (
    extension === "pdf" ||
    mime === "application/pdf"
  ) {
    const parser = new PDFParse({
      data: file.buffer,
    });

    try {
      const result =
        await parser.getText();

      /*
       * pdf-parse currently returns a
       * single text string.
       *
       * When you migrate to a parser that
       * exposes individual pages, only
       * this section needs changing.
       */

      return {
        pageCount: 1,
        pages: [
          {
            page: 1,
            text:
              result.text.trim(),
          },
        ],
      };
    } finally {
      await parser.destroy();
    }
  }

  if (
    extension === "docx" ||
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result =
      await mammoth.extractRawText({
        buffer: file.buffer,
      });

    return {
      pageCount: 1,
      pages: [
        {
          page: 1,
          text:
            result.value.trim(),
        },
      ],
    };
  }

  if (
    extension === "txt" ||
    mime === "text/plain"
  ) {
    return {
      pageCount: 1,
      pages: [
        {
          page: 1,
          text: file.buffer
            .toString("utf8")
            .trim(),
        },
      ],
    };
  }

  throw new Error(
    "Unsupported document format."
  );
}
