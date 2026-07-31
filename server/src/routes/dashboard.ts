import { Router } from "express";

import auth from "../middleware/auth.js";

import User from "../models/User.js";
import Document from "../models/Document.js";

const router = Router();

router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      const user =
        await User.findById(
          ownerId
        ).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({
            error:
              "User not found.",
          });
      }

      const recentDocuments =
        await Document.find({
          owner: ownerId,
        })
          .sort({
            lastAccessed: -1,
          })
          .limit(5);

      const stats = {
        documents:
          user.documentsUploaded,

        chunks: recentDocuments.reduce(
          (
            total,
            document
          ) =>
            total +
            document.chunkCount,
          0
        ),

        storage:
          user.storageUsed,

        questions:
          user.questionsAsked,
      };

      const activity = (
        user.activity ?? []
      )
        .sort((a, b) =>
          a.date.localeCompare(
            b.date
          )
        )
        .slice(-7)
        .map((day) => ({
          label: new Date(
            day.date
          ).toLocaleDateString(
            "en-US",
            {
              weekday:
                "short",
            }
          ),
          uploads:
            day.uploads,
          questions:
            day.questions,
        }));

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar:
            user.avatar,
          plan: user.plan,
        },

        stats,

        recentDocuments:
          recentDocuments.map(
            (
              document
            ) => ({
              documentId:
                document.id,

              fileName:
                document.fileName,

              originalName:
                document.originalName,

              pageCount:
                document.pageCount,

              chunkCount:
                document.chunkCount,

              questionCount:
                document.questionCount,

              fileSize:
                document.fileSize,

              lastAccessed:
                document.lastAccessed,

              createdAt:
                document.createdAt,
            })
          ),

        activity,

        limits: {
          storageUsed:
            user.storageUsed,

          storageLimit:
            user.storageLimit,

          storageRemaining:
            Math.max(
              0,
              user.storageLimit -
                user.storageUsed
            ),
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to load dashboard.",
      });
    }
  }
);

export default router;
