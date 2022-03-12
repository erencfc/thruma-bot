export default (client) => {
    client.success = (message, msg) => {
        return message.channel.embed(client.embeds.success(`**${msg}**`));
    };
};
