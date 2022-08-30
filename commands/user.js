const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {
        // Generic command to show info about the command user
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
    },
}