const fs = require('node:fs')
const path = require('node:path')
const { NEWCOMMAND } = require('../utils/constants')
const { deployNewCommand } = require('../utils/helpers')

module.exports = {
    name : 'new-command',
    async execute(interaction) {

        try {
            let name = interaction.fields.getTextInputValue('name-txt').toLowerCase()
            const description = interaction.fields.getTextInputValue('description-txt')
            const reply = interaction.fields.getTextInputValue('reply-txt')

            if(name.split(' ').length > 1) name = name.split(' ').join('-')

            const newCommBody = NEWCOMMAND
                .replace('guildIdStr', interaction.guild.id)
                .replace('nameStr', name)
                .replace('descriptionStr', description)
                .replace('replyStr', reply)
        
            const rootDir = path.join(__dirname, '..', 'guildCommands')
            try { fs.mkdir(rootDir); console.log('guildCommands directory created!') } catch(error) {}

            const cmmndDir = path.join(rootDir, `${interaction.guild.id}`)
            try { fs.mkdirSync(cmmndDir); console.log(`${interaction.guild.id} directory created!`) } catch(error) {}

            const filePath = path.join(cmmndDir,`${name}.js`)
            await fs.writeFileSync(filePath, newCommBody)
            await interaction.reply('New Command Created!')

            const newCommand = require(filePath)

            await deployNewCommand(newCommand.guildId)
            interaction.client.guildCommands.set(newCommand.data.name, newCommand)
        } catch(error) {
            console.error('Error: ', error)
            await interaction.reply('Your new command was not in the proper format')
        }
    }
}