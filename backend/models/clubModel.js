import mongoose, { mongo } from "mongoose";

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
})

const Club = mongoose.model('Club', clubSchema);
export default Club