const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('bigoof')
        .setDescription('bigoof'),
    async execute(interaction) { 
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.big_oof)
        } else {
            await interaction.reply('There was a problem connecting to the database. Please contact an administrator.')
        }
    },
}