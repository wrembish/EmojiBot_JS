const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('html')
        .setDescription('HTML'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        if(convert) await interaction.reply(convert.execute('I can teach you HTML (How to meet ladies)'))
        else await interaction.reply('Something went wrong')
    },
}