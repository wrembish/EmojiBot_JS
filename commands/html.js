const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('html')
        .setDescription('HTML'),
    async execute(interaction) {
        if(interaction.client.conversionMap) {
            const { convert } = require('../utils/helpers')
            const convertedStr = await convert(interaction.client.conversionMap, 'I can teach you HTML (How to meet ladies)')
            await interaction.reply(convertedStr)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}