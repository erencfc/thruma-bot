import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LockSchema = new Schema({
    channelID: {
        type: String,
        required: true,
        unique: true,
    },

    expireAt: {
        type: Date,
    },
});

export default mongoose.model("Lock", LockSchema);
