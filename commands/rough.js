const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('rough')
        .setDescription('my first girlfriend turned into the moon'),
    async execute(interaction) {
        const convert = require('../emojibot_files/convert.js')
        interaction.reply(convert.execute('That\'s rough buddy'))
    },
}