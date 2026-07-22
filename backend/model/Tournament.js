import mongoose from "mongoose";

const tournamentShema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
    ],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date, required: true
    },
    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        required: true
    }


},{timestamps:true})

export default mongoose.model("Tournament", tournamentShema)