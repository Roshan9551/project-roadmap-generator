import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phase",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    whatItDoes: {
      type: String,
      default: "",
    },
    whatToLearn: {
      type: [String],
      default: [],
    },
    resource: {
      title: { type: String, default: "" },
      url: { type: String, default: "" },
      type: {
        type: String,
        enum: ["video", "article", "docs"],
        default: "video",
      },
    },
    estimatedHours: {
      type: Number,
      default: 0,
    },
    tuContext: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Module = mongoose.model("Module", moduleSchema);