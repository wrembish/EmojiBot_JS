const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('emjoi')
        .setDescription('close enough, I GUESS'),
    async execute(interaction) {
        const { emjoi } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(emjoi)
    },
}