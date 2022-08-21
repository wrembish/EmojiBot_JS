const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('grit')
        .setDescription('grit'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.grit)
        } else {
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}