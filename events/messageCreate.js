const { COMMANDCHAR, DATABASEERRORMESSAGE, EMOJI , MONGODATABASE, POINTSCOLLECTION } = require('../utils/constants.js')
const { convert, xlsxToCsv, download } = require('../utils/helpers.js')

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
            // Original convert emojis functionality. This is where the bot began
            const contentMessage = content.substring(EMOJI.length)
            if(contentMessage.length >= 1)  {
                if(message.client.conversionMap) {
                    const convertedStr = convert(message.client.conversionMap, contentMessage)
                    await message.channel.send(convertedStr)
                } else {    
                    await message.channel.send(DATABASEERRORMESSAGE)
                }
            }
        }
        // Fun little responses to stuff that were relevant at the time of initially creating the bot
        else if(content.toLowerCase().includes('/grit')) {
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
        //                                        Gambling Features                                       //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content.toLowerCase().startsWith(`${COMMANDCHAR}gamble `) && content.split(' ').length === 2) {
            // Allow the user to gamble their points if they have enough for what they wager
            // Currently set to be about a 1 in 4 chance of winning
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
            // Allow users to transfer their points to other users, if they have enough
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
            // Allows Admins to give people free points
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
                if(user.bot) {
                    await message.channel.send(`**I'm sorry ${message.author}, you can't give points to a bot!**`)
                    return
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
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                      File Handling Features                                    //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(content === `${COMMANDCHAR}xlsx2csv` && message.attachments.size !== 0) {
            message.attachments.each(async att => {
                const fs = require('fs')
                const path = require('path')
    
                const dirPath = path.join(__dirname, '..', 'temporaryFiles')
                const xlPath = path.join(dirPath, 'temp.xlsx')
                const csvPath = path.join(dirPath, att.name.substring(0, att.name.length - 5) + '.csv')
    
                download(att.attachment, xlPath, async () => {
                    xlsxToCsv(csvPath, dirPath)
                    fs.writeFileSync(xlPath, '')
    
                    await message.channel.send({ content : '**Here is your excel converted to csv**', files : [csvPath] })
                    
                    fs.rm(csvPath, () => {})
                })
            })
        }
    },
}