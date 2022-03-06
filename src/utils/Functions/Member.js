export default (client) => {
    client.member = {};
    client.member.getMemberById = async (id, message, g) => {
        if (message.mentions.members.first())
            return message.mentions.members.first();

        if (!id) id = message.author.id;
        let guild = g || message.guild;
        const member = await guild.members
            .fetch(id)
            .catch(() => null)
            .then((m) => m);

        if (!member) {
            return null;
        }

        return member;
    };
};
