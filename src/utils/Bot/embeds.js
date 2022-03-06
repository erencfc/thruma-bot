import { MessageEmbed } from "discord.js";

export default (client) => {
    client.embeds = {};

    client.embed = (color = "BLUE", description, title, member) => {
        let embed = new MessageEmbed().setColor(color);
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (member) embed.setThumbnail(member.displayAvatarURL());

        return embed;
    };

    const embeds = [
        "success",
        "error",
        "info",
        "warning",
        "loading",
        "random",
        "dark",
    ];
    const colors = [
        "#00ff00",
        "#ff0000",
        "#0000ff",
        "#ff9900",
        "#0099ff",
        "RANDOM",
        "DARK_BUT_NOT_BLACK",
    ];

    embeds.forEach((embed, index) => {
        client.embeds[embed] = (description, member) => {
            let emb = new MessageEmbed()
                .setColor(colors[index])
                .setDescription(description)
                .setTimestamp();

            if (member) emb.setThumbnail(member.displayAvatarURL());

            return emb;
        };
    });
};
