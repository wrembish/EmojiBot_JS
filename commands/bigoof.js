const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('bigoof')
        .setDescription('bigoof'),
    async execute(interaction) { 
        const { big_oof } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(big_oof)
    },
}