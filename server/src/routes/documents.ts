import { Router } from "express";

import auth from "../middleware/auth.js";

import Document from "../models/Document.js";
import User from "../models/User.js";

import {
  deleteDocument,
} from "../services/vectorStore.js";

const router = Router();

/*
 * GET /documents
 * List all user's documents
 */
router.get(
  "/documents",
  auth,
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      const documents =
        await Document.find({
          owner: ownerId,
        })
          .sort({
            createdAt: -1,
          })
          .select(
            "documentId fileName originalName pageCount chunkCount questionCount fileSize createdAt lastAccessed"
          );

      res.json(documents);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to load documents.",
      });
    }
  }
);

/*
 * DELETE /documents/:documentId
 */
router.delete<{
  documentId: string;
}>(
  "/documents/:documentId",
  auth,
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      const {
        documentId,
      } = req.params;

      const document =
        await Document.findOne({
          owner: ownerId,
          documentId,
        });

      if (!document) {
        return res
          .status(404)
          .json({
            error:
              "Document not found.",
          });
      }

      deleteDocument(
        ownerId,
        documentId
      );

      await User.findByIdAndUpdate(
        ownerId,
        {
          $inc: {
            documentsCount: -1,
            storageUsed:
              -document.fileSize,
          },
        }
      );

      await document.deleteOne();

      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to delete document.",
      });
    }
  }
);

/*
 * GET /documents/:documentId
 */
router.get<{
  documentId: string;
}>(
  "/documents/:documentId",
  auth,
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      const {
        documentId,
      } = req.params;

      const document =
        await Document.findOne({
          owner: ownerId,
          documentId,
        });

      if (!document) {
        return res
          .status(404)
          .json({
            error:
              "Document not found.",
          });
      }

      res.json(document);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to load document.",
      });
    }
  }
);

export default router;
