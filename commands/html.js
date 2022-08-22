const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('html')
        .setDescription('HTML'),
    async execute(interaction) {
        if(interaction.client.conversionMap) {
            const { convert } = require('../emojibot_files/helpers')
            const convertedStr = await convert(interaction.client.conversionMap, 'I can teach you HTML (How to meet ladies)')
            await interaction.reply(convertedStr)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}