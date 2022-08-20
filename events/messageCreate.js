const emoji = '!emoji '
const sf = require('../emojibot_files/sf.js')
const helpers = require('../emojibot_files/helpers.js')

module.exports = {
    name : 'messageCreate',
    async execute(message) {
        message.client.salesforce = await sf.checkAuth(message.client.salesforce)
        const guildIds = []
        const result = await sf.query(message.client.salesforce, 'SELECT+Name+FROM+GuildId__c')
        for(const record of result.records) {
            guildIds.push(record.Name)
        }

        if(guildIds.length != 0 && !guildIds.includes(message.guildId)) {
            const result = await sf.insert(message.client.salesforce, 'GuildId__c', { Name : message.guildId })
            if(result.id) console.log(`Successfully added ${message.guild.name} to the list of Servers`)
            else console.error('Error: ', result)

            await helpers.deployCommands(message.guildId)
        }

        if(message.author.id === message.client.user.id) return

        const content = message.content

        if(content.startsWith(emoji)) {
            const contentMessage = content.substring(emoji.length)
            if(contentMessage.length >= 1)  {
                const result = await sf.doPost(message.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : contentMessage })
                await message.channel.send(result)
            }
        } else if(content.includes('/grit')) {
            const { grit } = require('../emojibot_files/builtInMessages.json')
            if(grit) await message.channel.send(grit)
        } else if(content.toUpperCase().includes('SUCK')) {
            const { succ } = require('../emojibot_files/builtInMessages.json')
            if(succ) await message.channel.send(succ)
        } else if(content === '69' || content.startsWith('69 ') || content.endsWith(' 69') || content.includes(' 69 ')) {
            const result = await sf.doPost(message.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : '69? nice' })
            await message.channel.send(result)
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            const result = await sf.doPost(message.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : '420? nice' })
            await message.channel.send(result)
        } else if(content.includes('/oof') || content.includes('/bigoof')) {
            const { big_oof } = require('../emojibot_files/builtInMessages.json')
            if(big_oof) await message.channel.send(big_oof)
        }

        // if(content === '!!ping') await message.channel.send('Pong!')
    },
}