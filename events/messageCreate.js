const { emoji, DATABASEERRORMESSAGE, EMBEDCOLOR, COMMANDCHAR } = require('../emojibot_files/constants.js')
const { buildCronStr } = require('../emojibot_files/helpers.js')
const cron = require('node-cron')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name : 'messageCreate',
    async execute(message) {
        if(message.author.id === message.client.user.id) return

        const content = message.content

        if(content.startsWith(emoji)) {
            const contentMessage = content.substring(emoji.length)
            if(contentMessage.length >= 1)  {
                if(message.client.conversionMap) {
                    const { convert } = require('../emojibot_files/helpers.js')
                    const convertedStr = await convert(message.client.conversionMap, contentMessage)
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
                const { convert } = require('../emojibot_files/helpers.js')
                const convertedStr = await convert(message.client.conversionMap, '69? nice')
                await message.channel.send(convertedStr)
            } else {    
                await message.channel.send(DATABASEERRORMESSAGE)
            }
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            if(message.client.conversionMap) {
                const { convert } = require('../emojibot_files/helpers.js')
                const convertedStr = await convert(message.client.conversionMap, '420? nice')
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
        } else if(content.startsWith(`${COMMANDCHAR}set channel dogfacts `)) {
            const timeStr = content.substring(`${COMMANDCHAR}set channel dogfacts `.length)
            if(timeStr != '' && (timeStr.endsWith('AM') || timeStr.endsWith('PM'))) {
                cron.schedule(buildCronStr(timeStr), async () => {
                    let factResult
                    await fetch('http://dog-api.kinduff.com/api/facts')
                        .then(response => response.json())
                        .then(data => factResult = data)
                        .catch(error => console.error('Error: ', error))
                    
                    let imageResult
                    await fetch('https://dog.ceo/api/breeds/image/random')
                        .then(response => response.json())
                        .then(data => imageResult = data)
                        .catch(error => console.error('Error: ', error))

                    const messageEmbed = new EmbedBuilder()
                        .setTitle('**__Daily Dog Fact__**')
                        .setDescription(factResult.facts[0])
                        .setColor(EMBEDCOLOR)
                        .setImage(imageResult.message)
                    
                    
                    await message.channel.send({ embeds : [messageEmbed] })
                })
                await message.channel.send(`**Channel successfully set to recieve a random dogfact daily at __${timeStr}__**`)
            }
        }

        // if(content === '!!ping') await message.channel.send('Pong!')
    },
}