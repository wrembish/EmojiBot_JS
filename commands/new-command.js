const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('new-command')
        .setDescription('Create a new Slash Command!'),

    async execute(interaction) {
        if(interaction.inGuild()) {
            const modal = new ModalBuilder()
                .setCustomId('new-command')
                .setTitle('Create a New Command!')

            const nameText = new TextInputBuilder()
                .setCustomId('name-txt')
                .setLabel('Command Name : ')
                .setPlaceholder('Enter a name for your command...')
                .setStyle(TextInputStyle.Short)

            const descriptionText = new TextInputBuilder()
                .setCustomId('description-txt')
                .setLabel('Command Description : ')
                .setPlaceholder('Enter a description for your command...')
                .setStyle(TextInputStyle.Short)

            const replyText = new TextInputBuilder()
                .setCustomId('reply-txt')
                .setLabel('Command Response : ')
                .setPlaceholder('Enter what you want your command to say...')
                .setStyle(TextInputStyle.Paragraph)

            const nameActionRow = new ActionRowBuilder()
                .addComponents(nameText)

            const descriptionActionRow = new ActionRowBuilder()
                .addComponents(descriptionText)

            const replyActionRow = new ActionRowBuilder()
                .addComponents(replyText)

            modal.addComponents(nameActionRow, descriptionActionRow, replyActionRow)

            await interaction.showModal(modal)
        } else await interaction.reply('You can only use this command from inside a server!')
    }
}