import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    settings: {
        type: Object,
        default: {},
    },
    actives: {
        type: Object,
        default: {},
    },
});

export default mongoose.model("Setting", SettingSchema);
