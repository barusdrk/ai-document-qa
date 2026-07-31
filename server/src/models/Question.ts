import mongoose, {
  InferSchemaType,
  Schema,
} from "mongoose";

const QuestionSchema =
  new Schema(
    {
      owner: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      document: {
        type:
          Schema.Types.ObjectId,
        ref: "Document",
        required: true,
        index: true,
      },

      /* User input */

      question: {
        type: String,
        required: true,
        trim: true,
      },

      /* AI response */

      answer: {
        type: String,
        required: true,
      },

      /* Analytics */

      responseTime: {
        type: Number,
        default: 0,
      },

      retrievedChunks: {
        type: Number,
        default: 0,
      },

      tokenUsage: {
        type: Number,
        default: 0,
      },

      /* Metadata */

      model: {
        type: String,
        default: "mock-ai",
      },

      promptVersion: {
        type: String,
        default: "1.0",
      },

      successful: {
        type: Boolean,
        default: true,
      },

      errorMessage: {
        type: String,
        default: "",
      },

      /* Future features */

      bookmarked: {
        type: Boolean,
        default: false,
      },

      feedback: {
        type: Number,
        enum: [-1, 0, 1],
        default: 0,
      },

      tags: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

export type Question =
  InferSchemaType<
    typeof QuestionSchema
  >;

export default mongoose.model<Question>(
  "Question",
  QuestionSchema
);
