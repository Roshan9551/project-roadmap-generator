import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

const protect = async (req, res, next) => {
    try{
        // get the token from header
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Not authorized, no token "});
        }

        // Extract token
        const token = authHeader.split(" ")[1];
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request (minus password)
        req.user = await User.findById(decoded.id).select("-password");

        // // Add this check
        // const user = await User.findById(decoded.id || decoded._id).select("-password");

        // if (!user) {
        //     return res.status(401).json({ message: "User not found" });
        // }

        // req.user = user;

        next();
    }catch(error){
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}

export default protect;