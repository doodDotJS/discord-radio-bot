const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "You are here already.",
  usage: "",
  run: (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("BLUE")
      .setTitle("Hello!")
      .setDescription(
        "This is just some dumb bot that plays live radio stations in the [British Isles](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/British_Isles_all.svg/1200px-British_Isles_all.svg.png) :flag_gb: :flag_ie: \n Here are my commands:"
      )
      .setTimestamp()
      .setFooter("Made by dood.js#2122");

    client.commands.forEach((obj) => {
      embed.addField(
        `${client.prefix}${obj.name} ${obj.usage}`,
        obj.description
      );
    });

    message.reply(embed);
  },
};
