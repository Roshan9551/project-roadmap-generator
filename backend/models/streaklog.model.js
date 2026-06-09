import mongoose from "mongoose";

const streakLogSchema = new mongoose.Schema({
    date:{
        type:String
    },
    modulesCompleted:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    note:{
        type:String
    }
})