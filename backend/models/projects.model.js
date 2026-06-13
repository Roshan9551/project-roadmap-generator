import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      default: "BCA",
    },
    semester: {
      type: String,
      default: "6th",
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    studentStack: {
      type: String,
      default: "",
    },
    aiRecommendedStack: {
      type: [String],
      default: [],
    },
    aiStackVerdict: {
      type: String,
      default: "",
    },
    aiStackSuggestion: {
      type: String,
      default: "",
    },
    submissionDate: {
      type: Date,
      default: null,
    },
    healthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);