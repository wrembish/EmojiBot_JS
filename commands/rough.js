const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('rough')
        .setDescription('my first girlfriend turned into the moon'),
    async execute(interaction) {
        if(interaction.client.conversionMap) {
            const { convert } = require('../utils/helpers')
            const convertedStr = await convert(interaction.client.conversionMap, 'That\'s rough buddy')
            await interaction.reply(convertedStr)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}