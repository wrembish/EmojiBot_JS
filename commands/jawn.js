const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('jawn')
        .setDescription('jawn'),
    async execute(interaction) {
        const { jawn } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(jawn)
    },
}