import { Router } from "express";
import multer from "multer";

import auth from "../middleware/auth.js";

import Document from "../models/Document.js";

import {
  extractText,
  type ExtractedDocument,
} from "../services/extractText.js";

import { splitText } from "../utils/splitText.js";

import { createEmbedding } from "../services/embedding.js";

import { storeDocument } from "../services/vectorStore.js";

import { recordUpload } from "../services/analytics.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      let extracted: ExtractedDocument;

      let originalName =
        "Pasted Text";

      let mimeType =
        "text/plain";

      let fileSize = 0;

      if (req.file) {
        originalName =
          req.file.originalname;

        mimeType =
          req.file.mimetype;

        fileSize =
          req.file.size;

        extracted =
          await extractText(
            req.file
          );
      } else if (
        typeof req.body.text ===
        "string"
      ) {
        const text =
          req.body.text.trim();

        fileSize =
          Buffer.byteLength(
            text,
            "utf8"
          );

        extracted = {
          pageCount: 1,
          pages: [
            {
              page: 1,
              text,
            },
          ],
        };
      } else {
        return res.status(400).json({
          error:
            "No document provided.",
        });
      }

      const hasText =
        extracted.pages.some(
          (page) =>
            page.text.trim()
              .length > 0
        );

      if (!hasText) {
        return res.status(400).json({
          error:
            "Document contains no text.",
        });
      }

      const chunks =
        splitText(
          extracted.pages
        );

      const document =
        await Document.create({
          owner: ownerId,

          fileName:
            originalName,

          originalName,

          mimeType,

          fileSize,

          pageCount:
            extracted.pageCount,

          chunkCount:
            chunks.length,

          lastAccessed:
            new Date(),
        });

      const vectors =
        await Promise.all(
          chunks.map(
            async (
              chunk
            ) => ({
              page:
                chunk.page,

              text:
                chunk.text,

              embedding:
                await createEmbedding(
                  chunk.text
                ),
            })
          )
        );

      storeDocument(
        ownerId,
        document.id,
        vectors
      );

      await recordUpload({
        ownerId,
        fileSize,
      });

      res.json({
        documentId:
          document.id,

        chunks:
          chunks.length,

        pages:
          extracted.pageCount,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to upload document.",
      });
    }
  }
);

export default router;
