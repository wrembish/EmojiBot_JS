const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ahhh')
        .setDescription('ahhh'),
    async execute(interaction) {
        const { ahhh } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(ahhh)
    },
}