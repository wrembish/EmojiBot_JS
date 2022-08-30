const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with Pong!'),
    async execute(interaction) {
        // Generic "Hello World" type slash command
        await interaction.reply('Pong!')
    },
}