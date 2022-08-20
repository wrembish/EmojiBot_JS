const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('rough')
        .setDescription('my first girlfriend turned into the moon'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        if(convert) await interaction.reply(convert.execute('That\'s rough buddy'))
        else await interaction.reply('Something went wrong')
    },
}