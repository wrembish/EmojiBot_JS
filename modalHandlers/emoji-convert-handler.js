const { convert } = require("../utils/helpers")

module.exports = {
    name : 'emoji-convert',
    async execute(interaction) {
        await interaction.reply(convert(interaction.client.conversionMap, interaction.fields.getTextInputValue('text-to-convert')))
    }
}