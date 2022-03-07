import Discord from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync("./src/commands/");

(async () => {
    (await import(`./handlers/util.js`)).default(client);
    (await import(`./handlers/event.js`)).default(client);
    (await import(`./handlers/command.js`)).default(client);
})();

client.login(process.env.TOKEN);
