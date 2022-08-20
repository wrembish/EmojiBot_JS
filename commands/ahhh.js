const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ahhh')
        .setDescription('ahhh'),
    async execute(interaction) {
        const { ahhh } = require('../emojibot_files/builtInMessages.json')
        if(ahhh) await interaction.reply(ahhh)
        else await interaction.reply('Something went wrong')
    },
}