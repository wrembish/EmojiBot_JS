const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        // Stop the command from being used in DMs
        if (interaction.guild === null) {
            await interaction.reply('**Sorry, this command can only be used from within a Server!**')
        } else {
            // Generic command to display server information
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
        }
    },
}