const { MessageEmbed } = require("discord.js");
const prompter = require("discordjs-prompter");

module.exports = {
  name: "listento",
  description: "Select a radio station you want to listen to.",
  usage: "(You will be prompted)",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please join a voice channel first.");
    const radioStations = client.config.stations;
    const connection = await message.member.voice.channel.join();
    connection.voice.setSelfDeaf(true);

    const countryPromptEmbed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("BLUE")
      .setTitle("Select a country.")
      .setTimestamp()
      .setFooter("Closing in 15 seconds.");

    let countryPromptEmbedDesc =
      "Tell me the number of what country you want to select: ";

    const countryPossibleResponses = [];
    Object.keys(radioStations).forEach((key, index) => {
      countryPromptEmbedDesc = `${countryPromptEmbedDesc} \n${
        index + 1
      }. ${key}`;
      countryPossibleResponses.push(index + 1);
    });

    countryPromptEmbed.setDescription(countryPromptEmbedDesc);

    const countryPrompter = await prompter.message(message.channel, {
      question: countryPromptEmbed,
      userId: message.author.id,
      max: 1,
      timeout: 15000,
    });

    if (!countryPrompter.size)
      return message.reply("Operation cancelled due to no response.");

    const countryResponse = countryPrompter.first();

    if (!countryPossibleResponses.includes(Number(countryResponse.content)))
      return message.reply("Invalid response.");

    const stationsPromptEmbed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("BLUE")
      .setTitle("Select a radio station")
      .setTimestamp()
      .setFooter("Closing in 15 seconds.");

    let stationsPromptEmbedDesc =
      "Tell me the number of what radio station you want to play: ";

    let possibleResponses = [];

    radioStations[
      Object.keys(radioStations)[Number(countryResponse.content) - 1]
    ].forEach((obj, index) => {
      stationsPromptEmbedDesc = `${stationsPromptEmbedDesc} \n ${index + 1}. ${
        obj.name
      }`;
      possibleResponses.push(index + 1);
    });

    stationsPromptEmbed.setDescription(stationsPromptEmbedDesc);

    const stationsPrompter = await prompter.message(message.channel, {
      question: stationsPromptEmbed,
      userId: message.author.id,
      max: 1,
      timeout: 15000,
    });

    if (!stationsPrompter.size)
      return message.reply("Operation cancelled due to no response.");

    const stationsResponse = stationsPrompter.first();

    if (!possibleResponses.includes(Number(stationsResponse.content)))
      return message.reply("Invalid response.");

    await message.channel.send("Please wait...");
    const radioStationObject =
      radioStations[
        Object.keys(radioStations)[Number(countryResponse.content) - 1]
      ][Number(stationsResponse.content) - 1];

    connection.play(radioStationObject.url);

    client.stationPlaying[message.guild.id] = radioStationObject;

    message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor("GREEN")
        .setTitle("Success!")
        .setDescription(
          `Successfully set the radio station to ${radioStationObject.name}`
        )
    );
  },
};
