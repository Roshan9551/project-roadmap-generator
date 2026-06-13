import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    order:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true, 
        trim: true
    },
    description:{
        type: String,
        default: ""
    },
    whatToLearn:{
        type: [String],
        default: []
    },
    resource:{
        title: { type: String, default: "" },
        url: { type: String, default: "" },
        type: { 
            type: String, 
            enum: ["video", "article", "docs"],
            default: "video" 
        }
    },
    estimatedHours:{
        type: Number,
        default: 0
    },
    tuContext:{
        type: String,
        default: ""
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Date,
        default: null
    }
}, { timestamps:true });

export const Phase = mongoose.model("Phase", phaseSchema);