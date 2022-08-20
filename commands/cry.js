const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cry')
        .setDescription('a weekly occurance'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        if(convert) await interaction.reply(':cry: ' + convert.execute('time to cry boys') + ' :cry:')
        else await interaction.reply('Something went wrong')
    },
}