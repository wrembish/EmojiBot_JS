const cron = require('node-cron')
const { COMMANDCHAR, CRONCOLLECTION, DATABASEERRORMESSAGE, EMOJI , MONGODATABASE } = require('../utils/constants.js')
const { buildCronStr, convert, deleteCronJob, getDogFactsEmbed, getCatFactsEmbed } = require('../utils/helpers.js')

module.exports = {
    name : 'messageCreate',
    async execute(message) {
        if(message.author.id === message.client.user.id) return

        const content = message.content

        if(content.startsWith(EMOJI)) {
            const contentMessage = content.substring(EMOJI.length)
            if(contentMessage.length >= 1)  {
                if(message.client.conversionMap) {
                    const convertedStr = convert(message.client.conversionMap, contentMessage)
                    await message.channel.send(convertedStr)
                } else {    
                    await message.channel.send(DATABASEERRORMESSAGE)
                }
            }
        } else if(content.includes('/grit')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.grit)
            } else {
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content.toUpperCase().includes('SUCK')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.succ)
            } else {
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content === '69' || content.startsWith('69 ') || content.endsWith(' 69') || content.includes(' 69 ')) {
            if(message.client.conversionMap) {
                const convertedStr = convert(message.client.conversionMap, '69? nice')
                await message.channel.send(convertedStr)
            } else {    
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            if(message.client.conversionMap) {
                const convertedStr = convert(message.client.conversionMap, '420? nice')
                await message.channel.send(convertedStr)
            } else {    
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content.includes('/oof') || content.includes('/bigoof')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.big_oof)
            } else {
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } 
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          New Features                                          //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.startsWith(`${COMMANDCHAR}set channel dogfacts `)) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, 'dogfacts')

            const timeStr = content.substring(`${COMMANDCHAR}set channel dogfacts `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                const cronStr = buildCronStr(timeStr)

                await collection.insertOne({ ChannelId : message.channelId, JobName : 'dogfacts', CronStr : cronStr })
                const mongoJobId = await collection.find({ ChannelId : message.channelId, JobName : 'dogfacts'}).toArray()

                const cronJob = cron.schedule(cronStr, async () => {
                    const messageEmbed = await getDogFactsEmbed()
                    await message.channel.send({ embeds : [messageEmbed] })
                })

                message.client.cronJobs.push({
                    id      : mongoJobId[0]._id,
                    channel : message.channelId,
                    cronStr : cronStr,
                    job     : 'dogfacts',
                    cronJob : cronJob
                })

                if(cronDeleted) await message.channel.send(`**Channel successfully rescheduled to receive a random dogfact daily at __${timeStr}__**`)
                else await message.channel.send(`**Channel successfully set to receive a random dogfact daily at __${timeStr}__**`)
            }
        } else if(content === `${COMMANDCHAR}remove channel dogfacts`) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, 'dogfacts')
            
            if(cronDeleted) await message.channel.send('**Successfully removed this channel from recieving daily dogfacts**')
            else await message.channel.send('**This channel isn\'t currently receiving daily dogfacts**')
        }
        
        else if(content.startsWith(`${COMMANDCHAR}set channel catfacts `)) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, 'catfacts')

            const timeStr = content.substring(`${COMMANDCHAR}set channel catfacts `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                const cronStr = buildCronStr(timeStr)

                await collection.insertOne({ ChannelId : message.channelId, JobName : 'catfacts', CronStr : cronStr })
                const mongoJobId = await collection.find({ ChannelId : message.channelId, JobName : 'catfacts'}).toArray()

                const cronJob = cron.schedule(cronStr, async () => {
                    const messageEmbed = await getCatFactsEmbed()
                    await message.channel.send({ embeds : [messageEmbed] })
                })
                message.client.cronJobs.push({
                    id      : mongoJobId[0]._id,
                    channel : message.channelId,
                    cronStr : cronStr,
                    job     : 'catfacts',
                    cronJob : cronJob
                })

                if(cronDeleted) await message.channel.send(`**Channel successfully rescheduled to receive a random catfact daily at __${timeStr}__**`)
                else await message.channel.send(`**Channel successfully set to receive a random catfact daily at __${timeStr}__**`)
            }
        } else if(content === `${COMMANDCHAR}remove channel catfacts`) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, 'catfacts')
            
            if(cronDeleted) await message.channel.send('**Successfully removed this channel from recieving daily catfacts**')
            else await message.channel.send('**This channel isn\'t currently receiving daily catfacts**')
        }
    },
}