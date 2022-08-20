const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kissing the homies'),
    async execute(interaction) {
        const { homies } = require('../emojibot_files/builtInMessages.json')
        if(homies) await interaction.reply(homies)
        else await interaction.reply('Something went wrong')
    },
}