import { StreakLog } from "../models/streaklog.model.js";
import { User } from "../models/users.model.js";

export const logStreak = async (req, res) => {
    try{
        const userId = req.user._id;
        const today = new Date();
        const todayString = today.toISOString().split("T")[0];

        const existingLog = await StreakLog.findOne({ userId, date: todayString });  // findOne({}) => checks if all fields
        if(existingLog){
            return res.status(400).json({ message: "Already logged today" });
        }

        const { modulesCompleted, hoursLogged, note } = req.body;
        const streak = await StreakLog.create({
            userId,
            date: todayString,
            modulesCompleted,
            hoursLogged,
            note
        });

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];
        if(user.lastStreakDate === yesterdayString){
            user.streakCount++;
        }else{
            user.streakCount = 1;
        }

        await User.findByIdAndUpdate(userId, {
            lastStreakDate: todayString,
            streakCount: user.streakCount
        });

        return res.status(200).json({
            message: "Streak Logged successfully",
            streak,
            streakCount: user.streakCount,
            lastStreakDate: todayString
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: message.error });
    }
}

export const getStreakHistory = async (req, res) => {
    try{
        const userId = req.user._id;
        const streaks = await StreakLog.find({ userId }).sort({ date: -1}).limit(30);
        const userStreak = await User.findById(userId).select("streakCount lastStreakDate");

        if(!userStreak){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Streak fetched successfully",
            totalDaysLogged: streaks.length,
            currentStreak: userStreak.streakCount,
            lastStreakDate: userStreak.lastStreakDate,
            logs: streaks
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}