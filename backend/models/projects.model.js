import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    studentStack:{
        type:String,
        required:true
    },
    finalStack:{
        type:String
    },
    submissionDate:{
        type:String
    },
    healthScore:{
        type:String
    }
}, {timestamps:true})