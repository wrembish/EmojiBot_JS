const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('pog')
        .setDescription('pog'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.pog)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}