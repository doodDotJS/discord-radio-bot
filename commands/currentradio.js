const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "currentradio",
  description: "Find out what radio is playing at the moment.",
  usage: "",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please join a voice channel first.");

    const foundInfo = client.stationPlaying[message.guild.id];

    if (foundInfo == null)
      return message.reply("Nothing seems to be playing at the moment.");

    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("BLUE")
      .setTitle(foundInfo.name)
      .setThumbnail(foundInfo.iconURL)
      .setTimestamp();

    message.reply(embed);
  },
};
