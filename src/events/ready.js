import bot from "../config/bot.js";

export default (client) => {
    client.once("ready", () => {
        console.log(client.user.username + " is ready!");

        setInterval(() => {
            var messages = [
                `${bot.prefix}yardım`,
                `${bot.prefix}davet`,
                `${bot.prefix}yapımcı`,
                `V${bot.version}`,
                `7/24 Aktif!`,
            ];
            var random = Math.floor(Math.random() * messages.length);
            client.user.setActivity(messages[random], { type: "LISTENING" });
        }, 15000);
    });
};
