import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      minlength: 6,
    },
    university: {
      type: String,
      default: "Tribhuvan University",
    },
    program: {
      type: String,
      enum: ["BCA", "CSIT", "BIT", "BIM", "BSc IT"],
      default: "BCA",
    },
    semester: {
      type: String,
      default: "6th",
    },
    streakCount: {
      type: Number,
      default: 0,
    },
    lastStreakDate: {
      type: Date,
      default: null,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);