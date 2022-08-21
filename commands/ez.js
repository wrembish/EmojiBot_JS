const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ez')
        .setDescription('3ez'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.ez)
        } else {
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}