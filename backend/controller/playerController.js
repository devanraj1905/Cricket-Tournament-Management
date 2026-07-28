import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Player from "../model/Player.js";

export const registerPlayer = async (req, res) => {
    try {
        const { name, email, password, battingStyle, bowlingStyle, playingRole } = req.body;

        const existingPlayer = await Player.findOne({ email });
        if (existingPlayer) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const player = await Player.create({
            name,
            email,
            password: hashedPassword,
            battingStyle,
            bowlingStyle,
            playingRole
        });

        res.status(201).json({
            message: "Registered Successfully",
            _id: player._id,
            name: player.name,
            email: player.email,
            role: player.role,
            playingRole: player.playingRole


        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};

export const loginPlayer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const player = await Player.findOne({ email });
        if (!player) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, player.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: player._id, role: player.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3 * 24 * 60 * 60 * 1000,
        }); 
        res.status(200).json({
            message: "Login Successfully",
            _id: player._id,
            name: player.name,
            email: player.email,
            role: player.role,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const logoutPlayer = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
}
export const findPlayerByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        const player = await Player.findOne({ email });
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json({
            _id: player._id,
            name: player.name,
            email: player.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfile = async (req, res) => {
    res.status(200).json(req.user)
}

export const getPlayerById = async (req, res) => {
    try {
        const { playerId } = req.params;
        const player = await Player.findById(playerId).select("-password");
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const promotePlayer = async (req, res) => {
    try {
        const { playerId } = req.params;

        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        player.role = "admin";
        await player.save();

        res.status(200).json({
            _id: player._id,
            name: player.name,
            email: player.email,
            role: player.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllPlayers = async (req, res) => {
        try {
                const player = await Player.find().select('-password')
                        
                res.status(200).json(player);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};