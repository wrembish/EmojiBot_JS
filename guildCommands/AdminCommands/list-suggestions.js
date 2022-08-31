const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, SUGGESTCOLLECTION, LACKACCESSERRORMESSAGE } = require('../../utils/constants')

module.exports = {
    guildId : process.env.ADMINSERVER,
    data : new SlashCommandBuilder()
        .setName('list-suggestions')
        .setDescription('Get a list of all suggestions!'),
        
    async execute(interaction) {
        if(process.env.ADMINS.split(',').includes(interaction.user.id)) {
            const collection = interaction.client.db.db(MONGODATABASE).collection(SUGGESTCOLLECTION)
            const documents = await collection.find({}).toArray()
            let reply = ''
            for(const doc of documents) {
                if(doc.Status === 'Submitted') {
                    reply +=
                        '```{\n' +
                        `    Suggestor : ${doc.User},\n` +
                        `    Suggestion : ${doc.Suggestion},\n` +
                        `    Status : ${doc.Status},\n` +
                        `    Suggestion Id: ${doc._id}\n` +
                        '}```\n\n'
                }
            }
            if (reply !== '') reply += '\n\n'
            for(const doc of documents) {
                if(doc.Status === 'Accepted') {
                    reply +=
                        '```{\n' +
                        `    Suggestor : ${doc.User},\n` +
                        `    Suggestion : ${doc.Suggestion},\n` +
                        `    Status : ${doc.Status},\n` +
                        `    Suggestion Id: ${doc._id}\n` +
                        '}```\n\n'
                }
            }

            if (reply !== '') await interaction.reply(reply)
            else await interaction.reply('No suggestions to list at this time!')
        } else await interaction.reply(LACKACCESSERRORMESSAGE)
    }
}