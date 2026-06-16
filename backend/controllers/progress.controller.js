import { Module } from "../models/module.model.js";
import { Phase } from "../models/phase.model.js";

export const completePhase = async (req, res) => {
    try{
        const { id } = req.params;
        // Our req.params has like: req.params = { id: "456" }
        const phase = await Phase.findById(id);

        if(!phase){
            return res.status(404).json({ message: "Phase not found" });
        }

        phase.isCompleted = true;
        phase.completedAt = new Date();
        await phase.save();

        // return the updated phase
        return res.status(200).json({
            message: "Phase marked as completed",
            phase
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const completeModule = async (req, res) => {
    try{
        const { id } = req.params;
        const module = await Module.findById(id);

        if(!module){
            return res.status(404).json({ message: "Module not found" });
        }

        module.isCompleted = true;
        module.completedAt = new Date();
        await module.save();

        // return updated module
        return res.status(200).json({
            message: "Module marked as completed",
            module
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}