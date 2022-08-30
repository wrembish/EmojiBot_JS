const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('emoji')
        .setDescription('!emoji as a slash command! :)'),

    async execute(interaction) {
        // Send a moda to get the input string to convert to emojis
        const modal = new ModalBuilder()
            .setCustomId('emoji-convert')
            .setTitle('!emoji as a slash command :)')

        const emojiInput = new TextInputBuilder()
            .setCustomId('text-to-convert')
            .setLabel('Text to Convert')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter the text you want converted...')
            
        const emojiActionRow = new ActionRowBuilder()
            .addComponents(emojiInput)

        modal.addComponents(emojiActionRow)

        await interaction.showModal(modal)
    }
}