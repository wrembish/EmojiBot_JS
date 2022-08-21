const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('jawn')
        .setDescription('jawn'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.jawn)
        } else {
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}