const { INTERACTIONERRORMESSAGE } = require('../utils/constants.js')

module.exports = {
    name : 'interactionCreate',
    async execute(interaction) {
        if(!interaction.isCommand()) return
        
        const command = interaction.client.commands.get(interaction.commandName)

        if(command) {
            try {
                await command.execute(interaction)
            } catch(error) {
                console.error('Error: ', error)
                await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
            }
        }
    },
}