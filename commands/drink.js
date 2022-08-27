const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../utils/constants')

// http://www.thecocktaildb.com

module.exports = {
    data : new SlashCommandBuilder()
        .setName('drink')
        .setDescription('Get a random drink recommendation'),
    async execute(interaction) {
        // get a random cocktail from the cocktail database api, if the returned cocktail
        // is non alcoholic, keep trying
        let result
        do {
            await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => result = data)
                .catch(error => console.error('Error: ', error))
        } while(result.strAlcoholic === 'Non alcoholic')

        // if no drinks are returned, throw an error
        if(!result.drinks || result.drinks.length === 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        // start building the reply
        const drink = result.drinks[0]
        const replyContent = `**${interaction.user} Why not give this drink a try?**`

        // create the ingredients list on the reply embed description
        let embedDescription = '**__Ingredients List__**\n'
        for(let i = 0; i < 15; ++i) {
            if(drink[`strIngredient${i+1}`] != null) {
                embedDescription += drink[`strIngredient${i+1}`]
                if(drink[`strMeasure${i+1}`] != null) embedDescription += ` : ${drink[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${drink.strInstructions}`

        // create the embed for the reply
        const replyEmbed = new EmbedBuilder()
            .setTitle(`**${drink.strDrink}**`)
            .setImage(drink.strDrinkThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
}