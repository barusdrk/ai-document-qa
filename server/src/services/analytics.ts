import User from "../models/User.js";
import Document from "../models/Document.js";
import Question from "../models/Question.js";

interface RecordUploadParams {
  ownerId: string;
  fileSize: number;
}

interface RecordQuestionParams {
  ownerId: string;
  documentId: string;
  question: string;
  answer: string;
  responseTime: number;
  retrievedChunks: number;
  tokenUsage?: number;
  model?: string;
}

function todayString() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

async function incrementDailyActivity(
  ownerId: string,
  field: "uploads" | "questions"
) {
  const today = todayString();

  const result =
    await User.updateOne(
      {
        _id: ownerId,
        "activity.date":
          today,
      },
      {
        $inc: {
          [`activity.$.${field}`]:
            1,
        },
      }
    );

  if (
    result.modifiedCount ===
    0
  ) {
    await User.updateOne(
      {
        _id: ownerId,
      },
      {
        $push: {
          activity: {
            date: today,
            uploads:
              field ===
              "uploads"
                ? 1
                : 0,
            questions:
              field ===
              "questions"
                ? 1
                : 0,
          },
        },
      }
    );
  }
}

export async function recordUpload({
  ownerId,
  fileSize,
}: RecordUploadParams) {
  await User.findByIdAndUpdate(
    ownerId,
    {
      $inc: {
        documentsUploaded: 1,
        storageUsed:
          fileSize,
      },
    }
  );

  await incrementDailyActivity(
    ownerId,
    "uploads"
  );
}

export async function recordQuestion({
  ownerId,
  documentId,
  question,
  answer,
  responseTime,
  retrievedChunks,
  tokenUsage = 0,
  model = "mock-ai",
}: RecordQuestionParams) {
  await Question.create({
    owner: ownerId,

    document:
      documentId,

    question,

    answer,

    responseTime,

    retrievedChunks,

    tokenUsage,

    model,
  });

  const document =
    await Document.findOne({
      _id: documentId,
      owner: ownerId,
    });

  if (document) {
    document.questionCount++;

    document.lastQuestion =
      question;

    document.lastQuestionAt =
      new Date();

    document.lastAccessed =
      new Date();

    document.retrievalCount +=
      retrievedChunks;

    document.totalResponseTime +=
      responseTime;

    document.averageResponseTime =
      document.totalResponseTime /
      document.questionCount;

    document.tokenUsage +=
      tokenUsage;

    await document.save();
  }

  await User.findByIdAndUpdate(
    ownerId,
    {
      $inc: {
        questionsAsked: 1,
      },
    }
  );

  await incrementDailyActivity(
    ownerId,
    "questions"
  );
}
