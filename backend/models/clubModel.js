import mongoose, { mongo } from "mongoose";

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    }
    // add reference later for players
})

const Club = mongoose.model('Club', clubSchema);
export default Club