const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();

const prefix = "!";
client.prefix = prefix;

client.stationPlaying = {};

const fs = require("fs");
fs.readdirSync("./commands/").forEach((file) => {
  if (!file.endsWith(".js")) return;
  client.commands.set(file.split(".")[0], require(`./commands/${file}`));
});

console.log(client.commands);

client.once("ready", async () => {
  console.log("ready");
  await client.user.setPresence({
    activity: { name: "UK/IE radio stations", type: "LISTENING" },
    status: "idle",
  });
});

client.on("message", async (message) => {
  if (message.mentions?.users?.first() == client.user.id)
    return message.channel.send(
      "Hey! \nRun `" + prefix + "help` to see my commands!"
    );
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).run(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(config.discord.token);
