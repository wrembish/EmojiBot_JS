const { ObjectId } = require('mongodb')
const { MONGODATABASE, BUGSCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'select-bug',
    async execute(interaction) {
        const bugId = new ObjectId(interaction.fields.getTextInputValue('bug-id'))
        const collection = interaction.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
        const bugs = await collection.find({ _id : bugId }).toArray()

        if(bugs.length > 0 && bugs[0].Status === 'Reported') {
            await collection.updateOne({ _id : bugId }, { $set : { Status : 'In Progress' } })
            await interaction.reply('**Successfully set the bug\'s status to "In Progress"**')
        } else if(bugs.length > 0) {
            await interaction.reply('**This bug is already being worked on!**')
        } else {
            await interaction('**Couldn\'t find the bug you were trying to select. Perhaps you mistyped the Bug Id?**')
        }
    }
}