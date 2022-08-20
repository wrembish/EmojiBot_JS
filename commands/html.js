const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('html')
        .setDescription('HTML'),
    async execute(interaction) {
        const sf = require('../emojibot_files/sf.js')
        interaction.client.salesforce = await sf.checkAuth(interaction.client.salesforce)
        const result = await sf.doPost(interaction.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : 'I can teach you HTML (How to meet ladies)' })
        await interaction.reply(result)
    },
}