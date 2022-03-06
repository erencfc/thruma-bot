import { Channel, Message } from "discord.js";

export default (client) => {
    Channel.prototype.embed = async function (embed) {
        const message = await this.send({ embeds: [embed] });
        return message;
    };

    Message.prototype.editEmbed = async function (embed) {
        const message = await this.edit({ embeds: [embed] });
        return message;
    };
};
