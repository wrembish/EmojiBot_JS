const { SlashCommandBuilder } = require('@discordjs/builders')
const { Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update Slash Commands'),
    async execute(interaction) {
        if(fs && path) {
            if(interaction.user.id === process.env.ADMIN) {
                try {
                    const updateSlash = require('../emojibot_files/deploy-commands.js')
                    const { succ } = require('../emojibot_files/builtInMessages.json')

                    if(updateSlash && succ) {
                        updateSlash.execute(interaction.client.user.id)

                        interaction.client.commands = new Collection()
                        const commandsPath = path.join(__dirname, '..', 'commands')
                        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

                        for(const file of commandFiles) {
                            const filePath = path.join(commandsPath, file)
                            const command = require(filePath)
                            interaction.client.commands.set(command.data.name, command)
                        }


                        await interaction.reply(succ + '  cess')
                    } else await interaction.reply('Something went wrong')
                } catch(error) {
                    console.error('Error: ', error)
                    await interaction.reply('There was an error when trying to update the commands')
                }
            } else {
                await interaction.reply('You do not have permission to use this command')
            }
        } else await interaction.reply('Something went wrong')
    },
}