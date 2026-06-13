import mongoose from "mongoose";

const dailyPlanSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    date:{
        type: String,
        required: true
    },
    dayNumber:{
        type: Number,
        required: true
    },
    taskName:{
        type: String,
        required: true
    },
    taskType:{
        type: String,
        enum: ["phase", "module"],
        required: true
    },
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    estimatedHours:{
        type: Number,
        default: 0
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const DailyPlan = mongoose.model("DailyPlan", dailyPlanSchema);