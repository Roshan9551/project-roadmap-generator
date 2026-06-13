import mongoose from "mongoose";

const streakLogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    modulesCompleted: {
        type: Number,
        default: 0
    },
    hoursLogged:{
        type: Number,
        default: 0
    },
    note:{
        type: String,
        default: ""
    }
}, { timestamps: true });

// Prevent duplicate logs for same user on same date
streakLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export const StreakLog = mongoose.model("StreakLog", streakLogSchema);