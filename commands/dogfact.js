const { SlashCommandBuilder } = require("discord.js");

// http://dog-api.kinduff.com

module.exports = {
    data : new SlashCommandBuilder()
        .setName('dogfact')
        .setDescription('Get a random fact about dogs'),
    async execute(interaction) {
        // get a random dog fact from the api hosted at http://dog-api.kinduff.com
        let result
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))
            
        await interaction.reply(`**${result.facts[0]}**`)
    }
}