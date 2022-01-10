const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "join",
  description: "Joins a voice channel.",
  usage: "(You will be prompted)",
  run: async (client, message, args) => {
    const errorEmbed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("RED")
      .setTitle("Error!");
    if (!message.member.voice.channel)
      return message.reply("Please join a voice channel first.");
    await message.member.voice.channel.join();
    message.reply("Joined the Voice Channel.");
  },
};
