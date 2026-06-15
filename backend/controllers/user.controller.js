import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// REGISTER
export const register = async (req, res) => {
    try{
        const { name, email, password, university, program, semester } = req.body; // destructuring the object came from request body for registration input. if we want single we can also take as const username = req.body.username;

        // check if all required fields exists
        if(!name || !email || !password){
            return res.status(400).josn({ message: "Please fill all required fields" });
        }

        // check if user already exits
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);  // it refers to how many time bcrypt scrambles the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
            university: university || "Tribhuvan University",
            program: program || "BCA",
            semester: semester || "6th"
        });

        // Return user data with token
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                program: user.program,
                semester: user.semester
            },
            token: generateToken(user._id),
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// LOGIN
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // check fields
        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // find user by email
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User doesn't exists" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return user with token
        return res.status(200).json({
            message: "Login successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                program: user.program,
                semester: user.semester
            },
            token: generateToken(user._id),
        });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// GET CURRENT USER (protected route)
export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({ user });
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}