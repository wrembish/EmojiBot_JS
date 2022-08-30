const { convert } = require("../utils/helpers")

module.exports = {
    name : 'emoji-convert',
    async execute(interaction) {
        // Handler for the /emoji command modal submission
        // Converts the user's input text to emojis and sends it to the channel the command was used
        await interaction.reply(convert(interaction.client.conversionMap, interaction.fields.getTextInputValue('text-to-convert')))
    }
}