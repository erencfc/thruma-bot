import mongoose from "mongoose";
import ms from "ms";

export default (client) => {
    client.once("ready", () => {
        (async function check() {
            const locks = await mongoose
                .model("Lock")
                .find({ expireAt: { $lte: new Date() } });

            for (let i = 0; i < locks.length; i++) {
                const lock = locks[i];

                await mongoose.model("Lock").deleteOne({ _id: lock._id });

                const channel =
                    client.channels.cache.get(lock.channelID) ||
                    (await client.channels.fetch(lock.channelID));
                if (!channel) continue;

                await channel.permissionOverwrites.edit(
                    channel.guild.roles.everyone,
                    {
                        SEND_MESSAGES: null,
                    }
                );
            }

            setTimeout(check, ms("30s"));
        })();
    });
};
