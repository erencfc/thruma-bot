import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VipSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },

    expireAt: {
        type: Date,
    },
});

export default mongoose.model("Vip", VipSchema);
