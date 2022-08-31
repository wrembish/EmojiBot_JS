const { ObjectId } = require('mongodb')
const { MONGODATABASE, BUGSCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'close-bug',
    async execute(interaction) {
        const bugId = new ObjectId(interaction.fields.getTextInputValue('bug-id'))
        const collection = interaction.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
        const bugs = await collection.find({ _id : bugId }).toArray()

        if(bugs.length > 0 && bugs[0].Status !== 'Closed') {
            await collection.updateOne({ _id : bugId }, { $set : { Status : 'Closed' } })
            await interaction.reply('**Bug was successfully closed!!**')
        } else if(bugs.length > 0) {
            await interaction.reply('**This bug has already been closed!**')
        } else {
            await interaction.reply('**Couln\'t find the bug you were trying to close. Perhaps you mistyped the Bug Id?**')
        }
    }
}