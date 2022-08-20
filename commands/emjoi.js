const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('emjoi')
        .setDescription('close enough, I GUESS'),
    async execute(interaction) {
        const { emjoi } = require('../emojibot_files/builtInMessages.json')
        if(emoji) await interaction.reply(emjoi)
        else await interaction.reply('Something went wrong')
    },
}