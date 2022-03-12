export default (client) => {
    client.on("messageCreate", async (message) => {
        let msg = message.content.match(/[A-Z]/g);

        if (
            !message.guild ||
            message.author.bot ||
            message.content.length < 12 ||
            !msg ||
            message.member.permissions.has("ADMINISTRATOR") ||
            !(await client.mongoose.getActive(message.guild, "caps"))
        )
            return;

        if (msg.length > message.content.length * 0.7) {
            if (message.deletable) message.delete();
            let msg = await message.channel.send(
                `${message.author} **Çok fazla büyük harf kullanıyorsun.**`
            );

            client.message.deleteMsg(msg, 3000);
        }
    });
};
