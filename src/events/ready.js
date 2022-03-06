export default (client) => {
    const prefix = "!";
    client.once("ready", () => {
        console.log(client.user.username + " is ready!");

        setInterval(() => {
            var messages = [
                `${prefix}yardım`,
                `${prefix}davet`,
                `${prefix}yapımcı`,
                // `V${version}`,
                `7/24 Aktif!`,
            ];
            var random = Math.floor(Math.random() * messages.length);
            client.user.setActivity(messages[random], { type: "LISTENING" });
        }, 15000);
    });
};
