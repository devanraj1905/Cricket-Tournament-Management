import mongoose from "mongoose"


const playerMatchStatsSchema = mongoose.Schema({
    match: {

        type: mongoose.Schema.ObjectId,
        ref: "Match",
        required: true

    },
    player: {
        type: mongoose.Schema.ObjectId,
        ref: "Player",
        required: true
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
        required: true
    },
    runsScored: {
        type: Number,
        default: 0
    },
    ballsFaced: {
        type: Number,
        default: 0
    },
    wicketsTaken: {
        type: Number,
        default: 0
    },
    oversBowled: {
        type: Number,
        default: 0
    },
    runsConceded: {
        type: Number,
        default: 0
    },
    catches: {
        type: Number,
        default: 0
    }
},{ timestamps: true })

export default mongoose.model("PlayerMatchStats", playerMatchStatsSchema)