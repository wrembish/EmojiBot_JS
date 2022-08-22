const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('jawn')
        .setDescription('jawn'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.jawn)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}