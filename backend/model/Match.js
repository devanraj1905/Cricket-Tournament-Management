import mongoose from "mongoose"



const matchShema = new mongoose.Schema({

    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    teamA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    teamB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    venue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["scheduled", "live", "completed"],
        default: "scheduled",
    },
    matchDate: {
        type: Date,
        required: true
    },

    tossWinner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
    ,
    winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
},

    result: { type: String }


}, { timestamps: true })
export default mongoose.model("Match", matchShema)