import mongoose, {
  InferSchemaType,
  Schema,
} from "mongoose";

const ActivitySchema =
  new Schema(
    {
      date: {
        type: String,
        required: true,
      },

      uploads: {
        type: Number,
        default: 0,
      },

      questions: {
        type: Number,
        default: 0,
      },
    },
    {
      _id: false,
    }
  );

const UserSchema =
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      /* Dashboard */

      documentsUploaded: {
        type: Number,
        default: 0,
      },

      questionsAsked: {
        type: Number,
        default: 0,
      },

      storageUsed: {
        type: Number,
        default: 0,
      },

      /* Weekly / Monthly charts */

      activity: {
        type: [ActivitySchema],
        default: [],
      },

      /* Future SaaS */

      plan: {
        type: String,
        enum: [
          "Free",
          "Pro",
          "Team",
        ],
        default: "Free",
      },

      storageLimit: {
        type: Number,
        default:
          5 *
          1024 *
          1024 *
          1024, // 5 GB
      },

      emailVerified: {
        type: Boolean,
        default: false,
      },

      avatar: {
        type: String,
        default: "",
      },

      darkMode: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export type User =
  InferSchemaType<
    typeof UserSchema
  >;

export default mongoose.model<User>(
  "User",
  UserSchema
);
