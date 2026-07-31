import { Router } from "express";
import { performance } from "node:perf_hooks";

import auth from "../middleware/auth.js";

import User from "../models/User.js";
import Document from "../models/Document.js";
import Question from "../models/Question.js";

import { answerQuestion } from "../services/rag.js";

const router = Router();

router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const ownerId = req.user!.id;

      const {
        documentId,
        question,
      } = req.body;

      if (!documentId) {
        return res.status(400).json({
          error:
            "Document ID is required.",
        });
      }

      if (
        typeof question !==
          "string" ||
        !question.trim()
      ) {
        return res.status(400).json({
          error:
            "Question is required.",
        });
      }

      const document =
        await Document.findOne({
          _id: documentId,
          owner: ownerId,
        });

      if (!document) {
        return res.status(404).json({
          error:
            "Document not found.",
        });
      }

      const start =
        performance.now();

      const result =
        await answerQuestion(
          ownerId,
          documentId,
          question.trim()
        );

      const responseTime =
        performance.now() -
        start;

      /* Save question history */

      await Question.create({
        owner: ownerId,

        document:
          document._id,

        question:
          question.trim(),

        answer:
          result.answer,

        responseTime,

        retrievedChunks:
          result.sources.length,

        tokenUsage: 0,

        model: "mock-ai",
      });

      /* Update document analytics */

      document.questionCount += 1;

      document.lastQuestion =
        question.trim();

      document.lastQuestionAt =
        new Date();

      document.lastAccessed =
        new Date();

      document.retrievalCount +=
        result.sources.length;

      document.totalResponseTime +=
        responseTime;

      document.averageResponseTime =
        document.totalResponseTime /
        document.questionCount;

      await document.save();

      /* Update user statistics */

      const today =
        new Date()
          .toISOString()
          .slice(0, 10);

      const activityResult =
        await User.updateOne(
          {
            _id: ownerId,
            "activity.date":
              today,
          },
          {
            $inc: {
              questionsAsked: 1,
              "activity.$.questions":
                1,
            },
          }
        );

      if (
        activityResult.modifiedCount ===
        0
      ) {
        await User.updateOne(
          {
            _id: ownerId,
          },
          {
            $inc: {
              questionsAsked: 1,
            },

            $push: {
              activity: {
                date: today,
                uploads: 0,
                questions: 1,
              },
            },
          }
        );
      }

      res.json({
        answer:
          result.answer,

        sources:
          result.sources,

        analytics: {
          responseTime,

          retrievedChunks:
            result.sources.length,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to answer question.",
      });
    }
  }
);

export default router;
