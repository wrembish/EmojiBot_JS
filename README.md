# EmojiBot_JS

## Before Running
* Go to the deploy-commands.js file in the root directory
  * Replace the comment /**Bot ClientId, Server GuildId */ with your Bot's Client Id, and the server you're adding the bot to's Guild Id
* run the deploy-commands.js file with `node deploy-commands.js`
* Make sure you create the following mentioned files
* Setup a mongodb cluster
  * In this cluster, set up a database called ConversionMap
  * In the ConversionMap database, setup 2 collections : BuiltInMessage and Character
* Run the following command
  * npm run import

## Files that need to be created
* environment variables (.env or similar)

## Environment Variables
* TOKEN="YOUR DISCORD BOT TOKEN GOES HERE"
* ADMIN="DISCORD USER ID FOR ADMIN USER OF BOT"
* MONGODB_URL="YOUR MONGODB CONNECTION URL GOES HERE"

## **NOTE**
* Commands can take up to an hour to fully deploy