const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('dogfact')
        .setDescription('Get a random fact about dogs'),
    async execute(interaction) {
        let result
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))
        await interaction.reply(`**${result.facts[0]}**`)
    }
}