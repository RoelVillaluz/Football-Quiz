import mongoose, { mongo } from "mongoose";
import Club from "./clubModel.js";

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
    },
    clubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
        }
    ]
})

const Player = mongoose.model("Player", playerSchema);
export default Player;