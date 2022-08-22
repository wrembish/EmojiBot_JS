const { emoji, DATABASEERRORMESSAGE } = require('../emojibot_files/constants.js')

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
                    await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
                }
            }
        } else if(content.includes('/grit')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.grit)
            } else {
                await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
            }
        } else if(content.toUpperCase().includes('SUCK')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.succ)
            } else {
                await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
            }
        } else if(content === '69' || content.startsWith('69 ') || content.endsWith(' 69') || content.includes(' 69 ')) {
            if(message.client.conversionMap) {
                const { convert } = require('../emojibot_files/helpers.js')
                const convertedStr = await convert(message.client.conversionMap, '69? nice')
                await message.channel.send(convertedStr)
            } else {    
                await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
            }
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            if(message.client.conversionMap) {
                const { convert } = require('../emojibot_files/helpers.js')
                const convertedStr = await convert(message.client.conversionMap, '420? nice')
                await message.channel.send(convertedStr)
            } else {    
                await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
            }
        } else if(content.includes('/oof') || content.includes('/bigoof')) {
            if(message.client.builtInMessages) {
                await message.channel.send(message.client.builtInMessages.big_oof)
            } else {
                await message.channel.send({ content : DATABASEERRORMESSAGE, ephemeral : true })
            }
        }

        // if(content === '!!ping') await message.channel.send('Pong!')
    },
}