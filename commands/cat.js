const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../emojibot_files/constants')

// https://cataas.com/#/

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get a random cat image'),
    async execute(interaction) {
        let result
        await fetch('https://cataas.com/cat?json=true')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))

        console.log(result)

        if(result) await interaction.reply({ embeds : [new EmbedBuilder().setImage(`https://cataas.com${result.url}`).setColor(EMBEDCOLOR)] })
        else await interaction.reply({ content : 'There was an error while executing this command.', ephemeral : true })
    }
}