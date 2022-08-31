const { MONGODATABASE, BUGSCOLLECTION } = require('../utils/constants')

module.exports = {
    name : 'report-bug',
    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
        
        await collection.insertOne({
            ReportedBy : interaction.user.tag,
            Description : interaction.fields.getTextInputValue('bug-txt'),
            ReportTime : (new Date(Date.now())).toString(),
            Status : 'Reported'
        })

        await interaction.reply(`**${interaction.user} Your bug has been reported successfully! Thank you for you help in making this bot the best it can be!**`)
    }
}