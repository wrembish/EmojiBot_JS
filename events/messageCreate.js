const cron = require('node-cron')
const { ObjectId } = require('mongodb')
const { COMMANDCHAR, CRONCOLLECTION, DATABASEERRORMESSAGE, EMOJI , MONGODATABASE, DOGFACT, CATFACT } = require('../utils/constants.js')
const { POINTSCOLLECTION, BUGSCOLLECTION, NEWCOMMAND } = require('../utils/constants.js')
const { buildCronStr, convert, deleteCronJob, getDogFactsEmbed, getCatFactsEmbed, deployNewCommand } = require('../utils/helpers.js')

module.exports = {
    name : 'messageCreate',
    async execute(message) {
        if(message.author.id === message.client.user.id) return

        const content = message.content
        const userMentions = message.mentions.users

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                   Original EmojiBot Features                                   //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        if(content.toLowerCase().startsWith(EMOJI)) {
            const contentMessage = content.substring(EMOJI.length)
            if(contentMessage.length >= 1)  {
                if(message.client.conversionMap) {
                    const convertedStr = convert(message.client.conversionMap, contentMessage)
                    await message.channel.send(convertedStr)
                } else {    
                    await message.channel.send(DATABASEERRORMESSAGE)
                }
            }
        } else if(content.toLowerCase().includes('/grit')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.grit)
            } else {
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content.toLowerCase().includes('suck')) {
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
        } else if(content.toLowerCase().includes('/oof') || content.toLowerCase().includes('/bigoof')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.big_oof)
            } else {
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                        Cron Job Features                                       //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}set channel ${DOGFACT} `)) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, DOGFACT)

            const timeStr = content.substring(`${COMMANDCHAR}set channel ${DOGFACT} `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                const cronStr = buildCronStr(timeStr)

                await collection.insertOne({ ChannelId : message.channelId, JobName : DOGFACT, CronStr : cronStr })
                const mongoJobId = await collection.find({ ChannelId : message.channelId, JobName : DOGFACT}).toArray()

                try {
                    const cronJob = cron.schedule(cronStr, async () => {
                        const messageEmbed = await getDogFactsEmbed()
                        await message.channel.send({ embeds : [messageEmbed] })
                    })

                    message.client.cronJobs.push({
                        id      : mongoJobId[0]._id,
                        channel : message.channelId,
                        cronStr : cronStr,
                        job     : DOGFACT,
                        cronJob : cronJob
                    })

                    if(cronDeleted) await message.channel.send(`**Channel successfully rescheduled to receive a ${DOGFACT.substring(0, DOGFACT.length-1)} dogfact daily at __${timeStr}__**`)
                    else await message.channel.send(`**Channel successfully set to receive a random ${DOGFACT.substring(0, DOGFACT.length-1)} daily at __${timeStr}__**`)
                } catch(error) {
                    console.error('Error: ', error)
                    await message.channel.send(`There was a problem setting this channel to recieve daily ${DOGFACT}`)
                }
            }
        } else if(content.toLowerCase() === `${COMMANDCHAR}remove channel ${DOGFACT}`) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, DOGFACT)
            
            if(cronDeleted) await message.channel.send(`**Successfully removed this channel from recieving daily ${DOGFACT}**`)
            else await message.channel.send(`**This channel isn't currently receiving daily ${DOGFACT}**`)
        }
        
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}set channel ${CATFACT} `)) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, CATFACT)

            const timeStr = content.substring(`${COMMANDCHAR}set channel ${CATFACT} `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                const cronStr = buildCronStr(timeStr)

                await collection.insertOne({ ChannelId : message.channelId, JobName : CATFACT, CronStr : cronStr })
                const mongoJobId = await collection.find({ ChannelId : message.channelId, JobName : CATFACT}).toArray()

                try {
                    const cronJob = cron.schedule(cronStr, async () => {
                        const messageEmbed = await getCatFactsEmbed()
                        await message.channel.send({ embeds : [messageEmbed] })
                    })
                    message.client.cronJobs.push({
                        id      : mongoJobId[0]._id,
                        channel : message.channelId,
                        cronStr : cronStr,
                        job     : CATFACT,
                        cronJob : cronJob
                    })

                    if(cronDeleted) await message.channel.send(`**Channel successfully rescheduled to receive a random ${0, CATFACT.substring(CATFACT.length-1)} daily at __${timeStr}__**`)
                    else await message.channel.send(`**Channel successfully set to receive a random ${CATFACT.substring(0, CATFACT.length-1)} daily at __${timeStr}__**`)
                } catch(error) {
                    console.error('Error: ', error)
                    await message.channel.send(`There was a problem setting this channel to recieve daily ${CATFACT}`)
                }
            }
        } else if(content.toLowerCase() === `${COMMANDCHAR}remove channel ${CATFACT}`) {
            const collection = message.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted = await deleteCronJob(message, collection, CATFACT)
            
            if(cronDeleted) await message.channel.send(`**Successfully removed this channel from recieving daily ${CATFACT}**`)
            else await message.channel.send(`**This channel isn't currently receiving daily ${CATFACT}**`)
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                        Gambling Features                                       //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}gamble `) && content.split(' ').length === 2) {
            const pointsToGamble = parseInt(content.split(' ')[1])
            if (Number.isNaN(pointsToGamble)) return

            const collection = message.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)
            const documents = await collection.find({ UserId : message.author.id }).toArray()
            const now = Date.now()

            if(documents.length > 0) {
                const NumberToWin = Math.floor(Math.random() * 4)
                let points = parseInt(documents[0].Points) + Math.floor((((now - parseInt(documents[0].LastUpdate)) / 60000 ) / 5) * 10)
                if (points > Number.MAX_SAFE_INTEGER) points = Number.MAX_SAFE_INTEGER
                const update = { $set : {} }
                if(pointsToGamble > points) {
                    await message.channel.send(`**I'm sorry ${message.author}, you don't have enough points to make this gamble! :(**`)
                } else if(Math.floor(Math.random() * 4) === NumberToWin) {
                    points += pointsToGamble
                    if (points > Number.MAX_SAFE_INTEGER) points = Number.MAX_SAFE_INTEGER
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
        } else if(content.toLowerCase().startsWith(`${COMMANDCHAR}give `) && content.split(' ').length === 3 && userMentions.size === 1) {
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
                    if (authorPoints > Number.MAX_SAFE_INTEGER) authorPoints = Number.MAX_SAFE_INTEGER
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
                        if (authorPoints > Number.MAX_SAFE_INTEGER) authorPoints = Number.MAX_SAFE_INTEGER
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
                        if (authorPoints > Number.MAX_SAFE_INTEGER) authorPoints = Number.MAX_SAFE_INTEGER
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
                    userPoints += parseInt(userDocs[0].Points) + Math.floor((((now - parseInt(userDocs[0].LastUpdate)) / 60000 ) / 5) * 10)
                    if (userPoints > Number.MAX_SAFE_INTEGER) userPoints = Number.MAX_SAFE_INTEGER
                    userUpdate.$set.Points = userPoints.toString()
                    userUpdate.$set.LastUpdate = now.toString()
                    await collection.updateOne({ _id : userDocs[0]._id }, userUpdate)
                } else {
                    userPoints += 50000
                    if (userPoints > Number.MAX_SAFE_INTEGER) userPoints = Number.MAX_SAFE_INTEGER
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
        }else if(content.toLowerCase().startsWith(`${COMMANDCHAR}adm give `) && content.split(' ').length === 4 && userMentions.size === 1 && process.env.ADMINS.split(',').includes(message.author.id)) {
            let pointsToGive
            let words = content.split(' ')
            for(let i = 2; i < 4; ++i) {
                if(!words[i].includes('@')) {
                    pointsToGive = parseInt(words[i])
                    break
                }
            }
            if(!pointsToGive || Number.isNaN(pointsToGive)) return

            const now = Date.now()
            const collection = message.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)

            userMentions.each(async user => {
                const userDocs = await collection.find({ UserId : user.id }).toArray()
                let userPoints = pointsToGive
                const userUpdate = { $set : {} }
                const userInsert = {}

                if(userDocs.length > 0) {
                    userPoints += parseInt(userDocs[0].Points) + Math.floor((((now - parseInt(userDocs[0].LastUpdate)) / 60000 ) / 5) * 10)
                    if (userPoints > Number.MAX_SAFE_INTEGER) userPoints = Number.MAX_SAFE_INTEGER
                    userUpdate.$set.Points = userPoints.toString()
                    userUpdate.$set.LastUpdate = now.toString()
                    await collection.updateOne({ _id : userDocs[0]._id }, userUpdate)
                } else {
                    userPoints += 50000
                    if (userPoints > Number.MAX_SAFE_INTEGER) userPoints = Number.MAX_SAFE_INTEGER
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
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}report bug : `) && content.substring(`${COMMANDCHAR}report bug : `.length).length > 0) {
            const bugDescription = content.toLowerCase().substring(`${COMMANDCHAR}report bug : `.length).trim()
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            await collection.insertOne({
                ReportedBy : message.author.tag,
                Description : bugDescription,
                ReportTime : (new Date(Date.now())).toString(),
                Status : 'Reported'
            })

            await message.channel.send(`**${message.author} Your bug has been reported successfully! Thank you for you help in making this bot the best it can be!**`)
        } else if(content === `${COMMANDCHAR}List Bugs` && process.env.ADMINS.split(',').includes(message.author.id)) {
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
        } else if(content.startsWith(`${COMMANDCHAR}Select Bug `) && process.env.ADMINS.split(',').includes(message.author.id) && content.substring(`${COMMANDCHAR}Select Bug `.length).length === 24) {
            const bugId = new ObjectId(content.substring(`${COMMANDCHAR}Select Bug `.length))
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({ _id : bugId }).toArray()

            if(bugs.length > 0 && bugs[0].Status === 'Reported') {
                await collection.updateOne({ _id : bugId }, { $set : { Status : 'In Progress' } })
                await message.channel.send('**Successfully set the bug\'s status to "In Progress"**')
            } else if(bugs.length > 0) {
                await message.channel.send('**This bug is already being worked on!**')
            } else {
                await message.channel.send('**Couldn\'t find the bug you were trying to select. Perhaps you mistyped the Bug Id?**')
            }
        } else if(content.startsWith(`${COMMANDCHAR}Close Bug `) && process.env.ADMINS.split(',').includes(message.author.id) && content.substring(`${COMMANDCHAR}Close Bug `.length).length === 24) {
            const bugId = new ObjectId(content.substring(`${COMMANDCHAR}Close Bug `.length))
            const collection = message.client.db.db(MONGODATABASE).collection(BUGSCOLLECTION)
            const bugs = await collection.find({ _id : bugId }).toArray()

            if(bugs.length > 0 && bugs[0].Status !== 'Closed') {
                await collection.updateOne({ _id : bugId }, { $set : { Status : 'Closed' } })
                await message.channel.send('**Bug was successfully closed!!**')
            } else if(bugs.length > 0) {
                await message.channel.send('**This bug has already been closed!**')
            } else {
                await message.channel.send('**Couln\'t find the bug you were trying to close. Perhaps you mistyped the Bug Id?**')
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                               POC                                              //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}new command : `) && message.inGuild()) {
            const fs = require('node:fs')
            const path = require('node:path')
            try {
                const commStr = content.substring(`${COMMANDCHAR}new command : `.length).replaceAll('”', '"').replaceAll('“', '"')
                const newComm = JSON.parse(commStr)
                if(newComm.name && newComm.description && newComm.reply) {
                    if(newComm.name.split(' ').length > 1) newComm.name = newComm.name.split(' ').join('-')

                    const newCommBody = NEWCOMMAND
                        .replace('guildIdStr', message.guildId)
                        .replace('nameStr', newComm.name.toLowerCase())
                        .replace('descriptionStr', newComm.description)
                        .replace('replyStr', newComm.reply)
                    
                    const rootDir = path.join(__dirname, '..', 'guildCommands')
                    try { fs.mkdir(rootDir); console.log('guildCommands directory created!') } catch(error) {}

                    const cmmndDir = path.join(rootDir, `${message.guildId}`)
                    try { fs.mkdirSync(cmmndDir); console.log(`${message.guildId} directory created!`) } catch(error) {}

                    const filePath = path.join(cmmndDir,`${newComm.name.toLowerCase()}.js`)
                    await fs.writeFileSync(filePath, newCommBody)
                    await message.channel.send('New Command Created!')

                    const newCommand = require(filePath)

                    await deployNewCommand(newCommand.guildId)
                    message.client.guildCommands.set(newCommand.data.name, newCommand)
                } else {
                    await message.channel.send('Your new command was not in the proper format')
                }
            } catch(error) {
                console.error('Error: ', error)
                await message.channel.send('Your new command was not in the proper format')
            }
        }
    },
}