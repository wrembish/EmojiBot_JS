const { SlashCommandBuilder } = require('discord.js')
const { getDogFactsEmbed } = require('../utils/helpers')

// http://dog-api.kinduff.com

module.exports = {
    data : new SlashCommandBuilder()
        .setName('dogfact')
        .setDescription('Get a random fact about dogs'),
    async execute(interaction) {
        // get a random dog fact from the api hosted at http://dog-api.kinduff.com
        let replyEmbed = await getDogFactsEmbed()
        replyEmbed.setTitle('**__Random Dog Fact__**')
            
        await interaction.reply({ embeds : [replyEmbed] })
    }
}