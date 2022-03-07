import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    registers: {
        type: Object,
        default: {},
    },
});

export default mongoose.model("Register", RegisterSchema);
