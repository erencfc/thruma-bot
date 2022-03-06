import Discord from "discord.js";
(await import("dotenv")).config();

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

client.login(process.env.TOKEN);
