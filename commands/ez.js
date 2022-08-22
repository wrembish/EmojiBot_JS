const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ez')
        .setDescription('3ez'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.ez)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}