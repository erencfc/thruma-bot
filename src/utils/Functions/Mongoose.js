import Setting from "../../models/Setting.js";
import Register from "../../models/Register.js";
import Vip from "../../models/Vip.js";
import Lock from "../../models/Lock.js";

export default (client) => {
    client.mongoose = {
        // VIP START

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

        // VIP END

        // SETTINGS START

        getActive: async (server, key) => {
            const active = await Setting.findOne({ guildID: server.id });
            if (!active) return null;
            if (!active.actives[key]) return null;
            return active.actives[key];
        },

        getActives: async (server) => {
            const actives = await Setting.findOne({ guildID: server.id });
            if (!actives) return null;
            if (!actives.actives) return null;
            return actives.actives;
        },

        setActive: async (server, key, value = true) => {
            let oldActives = await client.mongoose.getActives(server);

            let actives = {
                ...oldActives,
                [key]: value,
            };

            let status = await Setting.findOneAndUpdate(
                { guildID: server.id },
                { $set: { actives } },
                { new: true, upsert: true }
            );

            return status;
        },

        // SETTINGS END
    };
};
