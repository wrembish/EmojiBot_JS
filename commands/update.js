const { SlashCommandBuilder } = require('@discordjs/builders')
const { Collection } = require('discord.js')
const { admin } = require('../config.json')
const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update Slash Commands'),
    async execute(interaction) {
        if(interaction.user.id === admin) {
            try {
                const updateSlash = require('../emojibot_files/deploy-commands.js')
                const { succ } = require('../emojibot_files/builtInMessages.json')
                
                updateSlash.execute(interaction.client.user.id)

                interaction.client.commands = new Collection()
                const commandsPath = path.join(__dirname, '..', 'commands')
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

                for(const file of commandFiles) {
                    const filePath = path.join(commandsPath, file)
                    const command = require(filePath)
                    interaction.client.commands.set(command.data.name, command)
                }


                interaction.reply(succ + '  cess')
            } catch(error) {
                interaction.reply('There was an error when trying to update the commands')
            }
        } else {
            interaction.reply('You do not have permission to use this command')
        }
    },
}