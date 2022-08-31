const { ObjectId } = require('mongodb')
const { MONGODATABASE, SUGGESTCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'implement-suggestion',
    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(SUGGESTCOLLECTION)
        if(interaction.fields.getTextInputValue('suggestion-id').length !== 24) {
            await interaction.rely('You entered an invalid ID!')
            return
        }
        await collection.update(
            { _id : new ObjectId(interaction.fields.getTextInputValue('suggestion-id')) },
            { $set : { Status : 'Implemented' } }
        )
        interaction.reply('**Successfully updated the suggestion Status to "Implemented"!**')
    }
}