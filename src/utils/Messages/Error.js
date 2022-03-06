export default (client) => {
    client.noMember = (message) => {
        return message.channel.embed(
            client.embeds.error(`**Kullanıcı bulunamadı.**`)
        );
    };
};
