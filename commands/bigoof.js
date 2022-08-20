const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('bigoof')
        .setDescription('bigoof'),
    async execute(interaction) { 
        const { big_oof } = require('../emojibot_files/builtInMessages.json')
        if(big_oof) await interaction.reply(big_oof)
        else await interaction.reply('Something went wrong')
    },
}