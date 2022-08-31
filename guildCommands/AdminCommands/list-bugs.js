const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, BUGSCOLLECTION, LACKACCESSERRORMESSAGE } = require('../../utils/constants')

module.exports = {
    guildId : process.env.ADMINSERVER,
    data : new SlashCommandBuilder()
        .setName('list-bugs')
        .setDescription('Get a list of all unclosed bugs!'),
        
    async execute(interaction) {
        if(process.env.ADMINS.split(',').includes(interaction.user.id)) {
            const collection = interaction.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({}).toArray()
            let reply = ''

            if(bugs.length === 0) {
                await interaction.reply('**There are no bugs reported at this time!**')
                return
            } else {
                for(let i = 0; i < bugs.length; ++i) {
                    const bug = bugs[i]
                    if(bug.Status !== 'Closed') {
                        reply += 
                            `**__Bug #${(i+1).toString().padStart(4, '0')}__ : ${bug.Status}**\n` +
                            `Reported by ${bug.ReportedBy} on ${bug.ReportTime}\n` +
                            `*${bug.Description}*\n` +
                            `Bug Id : ${bug._id}\n\n`
                    }
                }
            }

            if (reply === '') await interaction.reply('**There are no open bugs reported at this time!**') 
            else interaction.reply(reply)
        } else await interaction.reply(LACKACCESSERRORMESSAGE)
    }
}