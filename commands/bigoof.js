const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('bigoof')
        .setDescription('bigoof'),
    async execute(interaction) { 
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.big_oof)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}