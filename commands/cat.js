const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../emojibot_files/constants')

// https://cataas.com/#/

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get a random cat image'),
    async execute(interaction) {
        // get a random cat image from the cats as a service api
        let result
        await fetch('https://cataas.com/cat?json=true')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))

        await interaction.reply({ embeds : [new EmbedBuilder().setImage(`https://cataas.com${result.url}`).setColor(EMBEDCOLOR)] })
    }
}