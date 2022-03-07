import mongoose from "mongoose";
import ms from "ms";

export default (client) => {
    client.once("ready", () => {
        (async function deleteVip() {
            await mongoose
                .model("Vip")
                .deleteMany({ expireAt: { $lte: new Date() } });

            setTimeout(deleteVip, ms("30m"));
        })();
    });
};
