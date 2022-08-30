const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../utils/constants.js')

// https://randomfox.ca/floof/

module.exports = {
    data : new SlashCommandBuilder()
        .setName('fox')
        .setDescription('Get a random fox picture'),
    async execute(interaction) {
        // get a random image of a fox from the api at https://randomfox.ca/floof/
        let result
        await fetch('https://randomfox.ca/floof/')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))

        const replyEmbed = new EmbedBuilder()
            .setTitle('https://randomfox.ca/')
            .setDescription('Random fox on every click!')
            .setImage(result.image)
            .setColor(EMBEDCOLOR)

        await interaction.reply({ embeds : [replyEmbed] })
    }
}