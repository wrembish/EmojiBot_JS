const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('grit')
        .setDescription('grit'),
    async execute(interaction) {
        const { grit } = require('../emojibot_files/builtInMessages.json')
        if(grit) await interaction.reply(grit)
        else await interaction.reply('Something went wrong')
    },
}