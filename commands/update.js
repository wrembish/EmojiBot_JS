const { SlashCommandBuilder } = require('@discordjs/builders')
const { Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update Slash Commands'),
    async execute(interaction) {
        if(interaction.user.id === process.env.ADMIN) {
            try {
                const helpers = require('../emojibot_files/helpers.js')
                const sf = require('../emojibot_files/sf.js')
                const { succ } = require('../emojibot_files/builtInMessages.json')

                interaction.client.salesforce = await sf.checkAuth(interaction.client.salesforce)
                const guildIds = []
                const result = await sf.query(interaction.client.salesforce, 'SELECT+Name+FROM+GuildId__c')
                for(const record of result.records) {
                    guildIds.push(record.Name)
                }

                for(const guildId of guildIds) {
                    helpers.deployCommands(guildId)
                }

                interaction.client.commands = new Collection()
                const commandsPath = path.join(__dirname, '..', 'commands')
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

                for(const file of commandFiles) {
                    const filePath = path.join(commandsPath, file)
                    const command = require(filePath)
                    interaction.client.commands.set(command.data.name, command)
                }


                await interaction.reply(succ + '  cess')
            } catch(error) {
                console.error('Error: ', error)
                await interaction.reply('There was an error when trying to update the commands')
            }
        } else {
            await interaction.reply('You do not have permission to use this command')
        }
    },
}