const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ez')
        .setDescription('3ez'),
    async execute(interaction) {
        const { ez } = require('../emojibot_files/builtInMessages.json')
        if(ez) await interaction.reply(ez)
        else await interaction.reply('Something went wrong')
    },
}