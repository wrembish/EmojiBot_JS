const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('salesforce')
        .setDescription('all my homies love salesforce'),
    async execute(interaction) {
        const { sf } = require('../emojibot_files/builtInMessages.json')
        if(sf) await interaction.reply(sf)
        else await interaction.reply('Something went wrong')
    },
}