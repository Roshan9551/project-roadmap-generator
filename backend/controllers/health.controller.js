import { Module } from "../models/module.model.js";
import { Phase } from "../models/phase.model.js";
import { Project } from "../models/projects.model.js";
import { User } from "../models/users.model.js";

export const getHealthScore = async (req, res) => {
    try{
        const { id: projectId } = req.params;
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        const totalPhases = await Phase.countDocuments({ projectId });
        const completedPhases = await Phase.countDocuments({
            projectId,
            isCompleted: true
        });

        const totalModules = await Module.countDocuments({ projectId });
        const completedModules = await Module.countDocuments({
            projectId,
            isCompleted: true
        });

        const user = await User.findById(req.user._id);

        // progressScore calculation
        const totalItems = totalPhases + totalModules;
        const completedItems = completedPhases + completedModules;
        const progressScore = totalItems === 0 ? 100 : (completedItems / totalItems) *100;

        // streakScore calculation
        const cappedStreak = Math.min(user.streakCount, 30)
        const streakScore = (cappedStreak / 30) * 100;

        // timescore calculation
        const today = new Date();
        const totalDays = Math.ceil(
            (project.submissionDate - new Date(project.createdAt)) / (1000 * 60 * 60 *24)
        );
        const daysLeft = Math.ceil(
            (project.submissionDate - today) / (1000 * 60 * 60 *24)
        )
        const timeScore = totalDays === 0 ? 100 : Math.max((daysLeft / totalDays) * 100, 0);
        // Math.max(..., 0) prevents negative score if deadline has passed

        const healthScore = Math.round(
            (progressScore * 0.5) + (streakScore * 0.2) + (timeScore * 0.3)
        );

        let label;
        if(healthScore >= 70){
            label = "On Track";
        }else if(healthScore >= 40){
            label = "At Risk";
        }else{
            label = "Critical";
        }

        // save back to project
        await Project.findByIdAndUpdate(projectId, { healthScore });

        // return everything
        return res.status(200).json({
            message: "Health score calculated",
            healthScore,
            label,
            breakdown: {
                progressScore: Math.round(progressScore),
                streakScore: Math.round(streakScore),
                timeScore: Math.round(timeScore)
            }
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}