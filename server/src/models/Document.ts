import mongoose, {
  InferSchemaType,
  Schema,
} from "mongoose";

const DocumentSchema =
  new Schema(
    {
      owner: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      /* File information */

      fileName: {
        type: String,
        required: true,
        trim: true,
      },

      originalName: {
        type: String,
        required: true,
        trim: true,
      },

      mimeType: {
        type: String,
        default: "",
      },

      fileSize: {
        type: Number,
        default: 0,
      },

      pageCount: {
        type: Number,
        default: 1,
      },

      /* Vector index */

      chunkCount: {
        type: Number,
        default: 0,
      },

      /* Usage */

      questionCount: {
        type: Number,
        default: 0,
      },

      retrievalCount: {
        type: Number,
        default: 0,
      },

      lastAccessed: {
        type: Date,
        default: Date.now,
      },

      /* AI analytics */

      lastQuestion: {
        type: String,
        default: "",
      },

      lastQuestionAt: Date,

      averageResponseTime: {
        type: Number,
        default: 0,
      },

      totalResponseTime: {
        type: Number,
        default: 0,
      },

      tokenUsage: {
        type: Number,
        default: 0,
      },

      favoriteTopics: {
        type: [String],
        default: [],
      },

      /* Future features */

      summary: {
        type: String,
        default: "",
      },

      language: {
        type: String,
        default: "",
      },

      tags: {
        type: [String],
        default: [],
      },

      archived: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export type Document =
  InferSchemaType<
    typeof DocumentSchema
  >;

export default mongoose.model<Document>(
  "Document",
  DocumentSchema
);
