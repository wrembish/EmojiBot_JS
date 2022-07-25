const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('succ')
        .setDescription('lmao'),
    async execute(interaction) {
        const { succ } = require('../emojibot_files/builtInMessages.json')
        if(succ) await interaction.reply(succ)
        else await interaction.reply('Something went wrong')
    },
}