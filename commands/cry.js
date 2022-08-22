const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cry')
        .setDescription('a weekly occurance'),
    async execute(interaction) {
        if(interaction.client.conversionMap) {
            const { convert } = require('../emojibot_files/helpers')
            const convertedStr = await convert(interaction.client.conversionMap, 'time to cry boys')
            await interaction.reply(`:cry:   ${convertedStr}   :cry:`)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}