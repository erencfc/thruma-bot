import Server from "../../models/Setting.js";
import Register from "../../models/Register.js";
import Vip from "../../models/Vip.js";
import Lock from "../../models/Lock.js";

export default (client) => {
    client.mongoose = {
        setVip: async (id, expireAt) => {
            const vip = await Vip.findOneAndUpdate(
                { guildID: id },
                { expireAt: expireAt },
                { new: true, upsert: true }
            );

            return vip;
        },

        removeVip: async (id) => {
            const vip = await Vip.findOneAndDelete({ guildID: id });

            return vip;
        },

        checkVip: async (id) => {
            const vip = await Vip.findOne({ guildID: id });
            if (!vip) return null;
            return vip;
        },
    };
};
