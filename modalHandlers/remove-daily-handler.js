const { MONGODATABASE, CRONCOLLECTION, DOGFACT, CATFACT } = require('../utils/constants')
const { deleteCronJob } = require('../utils/helpers')


module.exports = {
    name : 'remove-daily',
    async execute(interaction) {
        const jobInput = interaction.fields.getTextInputValue('job-name')
        let job
        if(jobInput.toLowerCase().includes('dog') && jobInput.toLowerCase().includes('facts')) {
            job = DOGFACT
        } else if(jobInput.toLowerCase().includes('cat') && jobInput.toLowerCase().includes('facts')) {
            job = CATFACT
        }

        const collection = interaction.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const cronDeleted = await deleteCronJob(interaction, collection, job)
        
        if (cronDeleted) await interaction.reply(`**Successfully removed this channel from recieving daily ${job}**`)
        else await interaction.reply(`**This channel isn't currently receiving daily ${job}**`)
    }
}