# EmojiBot_JS

## Before Running
* Go to the deploy-commands.js file in the root directory
  * Replace the comment /**Bot ClientId, Server GuildId */ with your Bot's Client Id, and the server you're adding the bot to's Guild Id
* run the deploy-commands.js file with `node deploy-commands.js`
* Make sure you create the following mentioned files

## Files that need to be created
* environment variables (.env or similar)
* /emojibot_files/guildIds.json
* /emojibot_files/historyTracker.json (***For If You Want to Track What and by Who is Being Converted by the Bot into Emojis***)
* /emojibot_files/internetDieCounter.json (***Currently Not Being Used***)

## Environment Variables
* TOKEN="YOUR DISCORD BOT TOKEN GOES HERE"
* ADMIN="DISCORD USER ID FOR ADMIN USER OF BOT"

## guildIds.json Format
```json
{
  "guildIds" : []
}
```
## historyTracker.json Format
```json
{

}
```

## internetDieCounter.json Format
```json
{

}
```
