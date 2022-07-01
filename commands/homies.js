const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kissing the homies'),
    async execute(interaction) {
        const { homies } = require('../emojibot_files/builtInMessages.json')
        await(interaction.reply(homies))
    },
}