const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('salesforce')
        .setDescription('all my homies love salesforce'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.sf)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}