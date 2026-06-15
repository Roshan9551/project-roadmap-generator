import { Module } from "../models/module.model.js";
import { Phase } from "../models/phase.model.js";
import { Project } from "../models/projects.model.js";

export const createProject = async (req, res) => {
    try{
        const {title, description, program, semester, skillLevel, studentStack, submissionDate} = req.body;
        const { _id: userId } = req.user;

        if(!title?.trim()){
            return res.status(400).json({ message: "Title is required" });
        }

        if (!description?.trim()) {
            return res.status(400).json({ message: "Description is required" });
        }

        const validSkillLevels = ["Beginner", "Intermediate", "Advanced"];
        if(skillLevel && !validSkillLevels.includes(skillLevel)){
            return res.status(400).json({
                message: `skillLevel must be one of: ${validSkillLevels.join(", ")}`
            });
        }

        if(submissionDate){
            const date = new Date(submissionDate);
            if (isNaN(date.getTime())) {
                return res.status(400).json({ message: "Invalid submission date" });
            }
            if (date <= new Date()) {
                return res.status(400).json({ message: "Submission date must be in the future" });
            }
        }

        // creating project
        const project = await Project.create({
            userId,
            title: title.trim(),
            description,
            program,
            semester,
            skillLevel,
            studentStack,
            submissionDate: submissionDate || null
        });

        return res.status(201).json({
            message: "Project created successfully",
            project
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProjects = async (req, res) => {
    try{
        const projects = await Project.find({ userId: req.user._id });

        return res.status(200).json({
            message: "Projects fetched successfully",
            count: projects.length,
            projects,
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProjectById = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id);

        // check if project exists
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        // check if the project belongs to logged-in user or not
        if(project.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "Access denied" });
        }

        // Fetch related phases and modules in parallel
        const [phases, modules] = await Promise.all([
            Phase.find({ projectId: req.params.id }),
            Module.find({ projectId: req.params.id })
        ]);

        return res.status(200).json({
            message: "Project fetched successfully",
            project,
            phases,
            modules
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id);

        // check if project exists
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        // check if the project belongs to the logged-in user
        if(project.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "Access denied" });
        }
        // why .toString() in above condition. => cause mongodb stores id as objectId objects, not strings. two objectid with same value are not === equal in js because they are objects. so we converted them into string

        // cascade the delete in parallel
        await Promise.all([
            Phase.deleteMany({ projectId: req.params.id }),
            Module.deleteMany({ projectId: req.params.id })
        ]);

        // delete the project
        await Project.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Project deleted successfully" })
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}