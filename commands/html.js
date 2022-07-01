const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('html')
        .setDescription('HTML'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        interaction.reply(convert.execute('I can teach you HTML (How to meet ladies)'))
    },
}