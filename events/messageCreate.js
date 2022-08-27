const cron = require('node-cron')
const { ObjectId } = require('mongodb')
const { COMMANDCHAR, CRONCOLLECTION, DATABASEERRORMESSAGE, EMOJI , MONGODATABASE, POINTSCOLLECTION, BUGSCOLLECTION } = require('../utils/constants.js')
const { buildCronStr, convert, deleteCronJob, getDogFactsEmbed, getCatFactsEmbed } = require('../utils/helpers.js')

module.exports = {
    name : 'messageCreate',
    async execute(message) {
        if(message.author.id === message.client.user.id) return

        const content = message.content
        const userMentions = message.mentions.users

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                   Original EmojiBot Features                                   //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
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
        //                                        Cron Job Features                                       //
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
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                        Gambling Features                                       //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.startsWith(`${COMMANDCHAR}gamble `) && content.split(' ').length === 2) {
            const pointsToGamble = parseInt(content.split(' ')[1])
            if (Number.isNaN(pointsToGamble)) return

            const collection = message.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)
            const documents = await collection.find({ UserId : message.author.id }).toArray()
            const now = Date.now()

            if(documents.length > 0) {
                const NumberToWin = Math.floor(Math.random() * 4)
                let points = parseInt(documents[0].Points) + Math.floor((((now - parseInt(documents[0].LastUpdate)) / 60000 ) / 5) * 10)
                const update = { $set : {} }
                if(pointsToGamble > points) {
                    await message.channel.send(`**I'm sorry ${message.author}, you don't have enough points to make this gamble! :(**`)
                } else if(Math.floor(Math.random() * 4) === NumberToWin) {
                    points += pointsToGamble
                    await message.channel.send(`**CONGRATULATIONS ${message.author}, YOU WIN!! You now have __${points}__ points!**`)
                } else {
                    points -= pointsToGamble
                    await message.channel.send(`**Ohhh.. Better luck next time ${message.author}! You now have __${points}__ points.**`)
                }
                update.$set.Points = points.toString()
                update.$set.LastUpdate = now.toString()
                await collection.updateOne({ _id : documents[0]._id }, update)
            } else if(pointsToGamble > 50000) {
                await message.channel.send(`**I'm sorry ${message.author}, you don't have enough points to make this gamble! :(**`)
                const insert = {
                    UserId : message.author.id,
                    Points : '50000',
                    LastUpdate : now.toString()
                }
                await collection.insertOne(insert)
            } else {
                const NumberToWin = Math.floor(Math.random() * 4)
                let points = 50000
                if (Math.floor(Math.random() * 4) === NumberToWin) {
                    points += pointsToGamble
                    await message.channel.send(`**CONGRATULATIONS ${message.author}, YOU WIN!! You now have __${points}__ points!**`)
                } else {
                    points -= pointsToGamble
                    await message.channel.send(`**Ohhh.. Better luck next time ${message.author}! You now have __${points}__ points.**`)
                }
                const insert = {
                    userId : message.author.id,
                    Points : points,
                    LastUpdate : now
                }
                await collection.insertOne(insert)
            }
        } else if(content.startsWith(`${COMMANDCHAR}give `) && content.split(' ').length === 3 && userMentions.size === 1) {
            let pointsToGive
            let words = content.split(' ')
            for(let i = 1; i < 3; ++i) {
                if(!words[i].includes('@')) {
                    pointsToGive = parseInt(words[i])
                    break
                }
            }
            if(!pointsToGive || Number.isNaN(pointsToGive)) return

            const now = Date.now()
            const collection = message.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)

            const authorDocs = await collection.find({ UserId : message.author.id }).toArray()
            let authorPoints = 50000
            const authorUpdate = { $set : {} }
            const authorInsert = {}

            if(authorDocs.length > 0) {
                authorUpdate.$set.LastUpdate = now.toString()
                authorPoints = parseInt(authorDocs[0].Points) + Math.floor((((now - parseInt(authorDocs[0].LastUpdate)) / 60000 ) / 5) * 10)
                if(authorPoints < pointsToGive) {
                    await message.channel.send(
                        `**I'm sorry ${message.author}, looks like you don't have enough points to give away!**\n`+
                        `**You have __${authorPoints}__ points.**`
                    )
                    authorUpdate.$set.Points = authorPoints.toString()
                    await collection.updateOne({ _id : message.author.id }, authorUpdate)
                    return
                }
            } else {
                authorInsert.UserId = message.author.id
                authorInsert.LastUpdate = now.toString()
                if(authorPoints < pointsToGive) {
                    await message.channel.send(
                        `**I'm sorry ${message.author}, looks like you don't have enough points to give away!**\n`+
                        `**You have __${authorPoints}__ points.**`
                    )
                    authorInsert.Points = authorPoints.toString()
                    await collection.insertOne(authorInsert)
                    return
                }
            }

            userMentions.each(async user => {
                if(message.author.id === user.id || user.bot) {
                    if(authorDocs.length > 0) {
                        authorUpdate.$set.Points = authorPoints.toString()
                        await collection.updateOne({ _id : authorDocs[0]._id }, authorUpdate)
                    } else {
                        authorInsert.Points = authorPoints.toString()
                        await collection.insertOne(authorInsert)
                    }
                    if (user.bot) await message.channel.send(`**I'm sorry ${message.author}, you can't give points to a bot!**`)
                    else await message.channel.send(`**${user} You can't give points to yourself, silly!**`)
                    return
                } else {
                    authorPoints -= pointsToGive
                    if(authorDocs.length > 0) {
                        authorUpdate.$set.Points = authorPoints.toString()
                        await collection.updateOne({ _id : authorDocs[0]._id }, authorUpdate)
                    } else {
                        authorInsert.Points = authorPoints.toString()
                        await collection.insertOne(authorInsert)
                    }
                }
                const userDocs = await collection.find({ UserId : user.id }).toArray()
                let userPoints = pointsToGive
                const userUpdate = { $set : {} }
                const userInsert = {}

                if(userDocs.length > 0) {
                    userPoints += userDocs[0].Points + Math.floor((((now - parseInt(userDocs[0].LastUpdate)) / 60000 ) / 5) * 10)
                    userUpdate.$set.Points = userPoints.toString()
                    userUpdate.$set.LastUpdate = now.toString()
                    await collection.updateOne({ _id : userDocs[0]._id }, userUpdate)
                } else {
                    userPoints += 50000
                    userInsert.UserId = user.id
                    userInsert.Points = userPoints.toString()
                    userInsert.LastUpdate = now.toString()
                    await collection.insertOne(userInsert)
                }

                await message.channel.send(
                    `**${user}, you have been given __${pointsToGive}__ points by ${message.author.tag}!**\n`+
                    `**You now have __${userPoints}__ points!**`
                )
            })
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          Bug Reporting                                         //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.startsWith(`${COMMANDCHAR}report bug : `) && content.substring(`${COMMANDCHAR}report bug : `.length).length > 0) {
            const bugDescription = content.substring(`${COMMANDCHAR}report bug : `.length).trim()
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            await collection.insertOne({
                ReportedBy : message.author.tag,
                Description : bugDescription,
                ReportTime : (new Date(Date.now())).toString(),
                Status : 'Reported'
            })

            await message.channel.send(`**${message.author} Your bug has been reported successfully! Thank you for you help in making this bot the best it can be!**`)
        } else if(content === `${COMMANDCHAR}List Bugs` && message.author.id === process.env.ADMIN) {
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({}).toArray()

            if(bugs.length === 0) {
                await message.channel.send('**There are no bugs reported at this time!**')
                return
            }

            let i = '1'
            let bugsShown = 0
            for(bug of bugs) {
                if(bug.Status !== 'Closed') {
                    await message.channel.send(
                        `**__Bug #${i.padStart(4, '0')}__ : ${bug.Status}**\n` +
                        `Reported by ${bug.ReportedBy} on ${bug.ReportTime}\n` +
                        `*${bug.Description}*\n` +
                        `Bug Id : ${bug._id}\n`
                    )
                    ++bugsShown
                }
                i = (parseInt(i) + 1).toString()
            }

            if(bugsShown === 0) {
                await message.channel.send('**There are no open bugs reported at this time!**')
            }
        } else if(content.startsWith(`${COMMANDCHAR}Select Bug `) && content.substring(`${COMMANDCHAR}Select Bug `.length).length > 0) {
            const bugId = new ObjectId(content.substring(`${COMMANDCHAR}Select Bug `.length))
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({ _id : bugId }).toArray()

            if(bugs.length > 0 && bugs[0].Status === 'Reported') {
                await collection.updateOne({ _id : bugId }, { $set : { Status : 'In Progress' } })
                await message.channel.send('**Successfully set the bug\'s status to "In Progress"**')
            } else {
                await message.channel.send('**Couldn\'t find the bug you were trying to select, or it is already being worked on. Perhaps you mistyped the Bug Id?**')
            }
        } else if(content.startsWith(`${COMMANDCHAR}Close Bug `) && content.substring(`${COMMANDCHAR}Close Bug `.length).length > 0) {
            const bugId = new ObjectId(content.substring(`${COMMANDCHAR}Close Bug `.length))
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({ _id : bugId }).toArray()

            if(bugs.length > 0 && bugs[0].Status !== 'Closed') {
                await collection.updateOne({ _id : bugId }, { $set : { Status : 'Closed' } })
                await message.channel.send('**Bug was successfully closed!!**')
            } else {
                await message.channel.send('**This bug has already been closed!**')
            }
        }
    },
}