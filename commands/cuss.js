const { SlashCommandBuilder } = require('@discordjs/builders')
const { execute } = require('./update')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cuss')
        .setDescription('cuss'),
    async execute(interaction) {
        const { cuss } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(cuss)
    }
}