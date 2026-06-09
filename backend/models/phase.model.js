import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
    estimatedHours:{
        type:String
    },
    tuContext:{
        type:String
    }
}, {timestamps:true})