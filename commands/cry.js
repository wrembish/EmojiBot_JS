const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cry')
        .setDescription('a weekly occurance'),
    async execute(interaction) {
        if(interaction.client.conversionMap) {
            const { convert } = require('../utils/helpers')
            const convertedStr = await convert(interaction.client.conversionMap, 'time to cry boys')
            await interaction.reply(`:cry:   ${convertedStr}   :cry:`)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}