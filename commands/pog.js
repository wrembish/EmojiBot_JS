const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('pog')
        .setDescription('pog'),
    async execute(interaction) {
        const { pog } = require('../emojibot_files/builtInMessages.json')
        if(pog) await interaction.reply(pog)
        else await interaction.reply('Something went wrong')
    },
}