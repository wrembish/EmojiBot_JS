const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('rough')
        .setDescription('my first girlfriend turned into the moon'),
    async execute(interaction) {
        const sf = require('../emojibot_files/sf.js')
        interaction.client.salesforce = await sf.checkAuth(interaction.client.salesforce)
        const result = await sf.doPost(interaction.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : 'That\'s rough buddy' })
        interaction.reply(result)
    },
}