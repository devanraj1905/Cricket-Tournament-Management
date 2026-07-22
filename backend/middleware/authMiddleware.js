import jwt from "jsonwebtoken"
import Player from "../model/Player.js"

export const verifyUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Access denined please login to access"})
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await Player.findById(decodedData.id)
        next()
    }
    catch (error) {
        return res.status(401).json(error.message )   
    }
}

export const rolebased = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user.role} is not allowed to access this resource` });
        }
        next();
    };
};