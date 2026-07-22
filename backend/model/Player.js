import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum:["player","admin","scorer"],
            default: "player",
        },
        playingRole:{
            type: String,
            enum:["batsman","bowler","wk-batsman","all-rounder"],
            
        },
        battingStyle: {
            type: String,
            enum:["left-hander","right-hander"]
        },
        bowlingStyle: {
            type: String,
            enum:["left-arm-pace","left-arm-spin","right-arm-pace","right-arm-spin"]
        },
    },
    { timestamps: true }
);



export default  mongoose.model("Player", playerSchema);