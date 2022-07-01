const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cry')
        .setDescription('a weekly occurance'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        interaction.reply(':cry: ' + convert.execute('time to cry boys') + ' :cry:')
    },
}