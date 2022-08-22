const { SlashCommandBuilder } = require('discord.js')
const { DATABASEERRORMESSAGE } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kissing the homies'),
    async execute(interaction) {
        if(interaction.client.builtInMessages) {
            await interaction.reply(interaction.client.builtInMessages.homies)
        } else {
            await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
        }
    },
}