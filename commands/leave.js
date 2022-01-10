const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  description: "Leaves the voice channel.",
  usage: "",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please join a voice channel first.");

    client.stationPlaying[message.guild.id] = null;

    message.member.voice.channel.leave();

    message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor("GREEN")
        .setTitle("Success!")
        .setDescription(`Left the Voice Channel.`)
    );
  },
};
