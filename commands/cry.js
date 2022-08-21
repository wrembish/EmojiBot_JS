const { SlashCommandBuilder } = require('discord.js')

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
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}