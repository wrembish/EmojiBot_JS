const { MONGODATABASE, SUGGESTCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'suggest-feature',
    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(SUGGESTCOLLECTION)
        
        const insertDoc = {
            User : interaction.user.tag,
            Suggestion : interaction.fields.getTextInputValue('suggestion-txt'),
            Status : 'Submitted'
        }

        await collection.insertOne(insertDoc)

        await interaction.reply(`Thank you **${interaction.user.tag}**! Your suggestion has been recieved!`)
    }
}