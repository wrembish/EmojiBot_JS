const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kissing the homies'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.homies)
        } else {
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}