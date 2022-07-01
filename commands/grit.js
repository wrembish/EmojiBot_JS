const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('grit')
        .setDescription('grit'),
    async execute(interaction) {
        const { grit } = require('../emojibot_files/builtInMessages.json')
        await interaction.reply(grit)
    },
}