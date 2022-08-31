const { ObjectId } = require('mongodb')
const { MONGODATABASE, SUGGESTCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'accept-suggestion',
    async execute(interaction) {
        // Allows Admins to Select a Bug by ID and automatically set it to In Progress Status
        const collection = interaction.client.db.db(MONGODATABASE).collection(SUGGESTCOLLECTION)
        if(interaction.fields.getTextInputValue('suggestion-id').length !== 24) {
            await interaction.rely('You entered an invalid ID!')
            return
        }
        await collection.update(
            { _id : new ObjectId(interaction.fields.getTextInputValue('suggestion-id')) },
            { $set : { Status : 'Accepted' } }
        )
        interaction.reply('**Successfully updated the suggestion Status to "Accepted"!**')
    }
}