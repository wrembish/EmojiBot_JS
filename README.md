# EmojiBot_JS
https://github.com/wrembish/EmojiBot_JS

This bot code started as a fun little C++ code to simply convert any message I wanted into a string of emojis that looked like
the letters. From there, I first created a Python Discord bot(https://github.com/wrembish/discord-emoji-bot-2.0.0) to be able
to have the bot automatically convert messages in discord that started with '!emoji', the same way my C++ code did. Then, I moved
to writing the bot in JS instead of Python to get more practice writing JS / NodeJS code. From there, this bot has become a hobby
of mine.

## Getting Started
* Setup a mongodb cluster
  * In this cluster, set up a database called EmojiBot (or rename the variable MONGODATABASE in constants.js to whatever you name it)
  * In the EmojiBot database, setup collections : 
    * BuiltInMessage (or rename the variable MESSAGESCOLLECTION in constants.js to whatever you name it)
    * Conversion (or rename the variable MAPCOLLECTION in constants.js to whatever you name it)
    * CronJob (or rename the variable CRONCOLLECTION in constants.js to whatever you name it)
    * Points (or rename the variable POINTSCOLLECTION in constants.js to whatever you name it)
    * Bugs (or rename the variable BUGSCOLLECTION in constants.js to whatever you name it)
* Run the following command
  * npm run import
* Setup the mentioned Environment Variables
* Deploy the slash commands with the following command
  * npm run deploy-comms
* Once everything above is setup and successful, run the program with the following command
  * npm run start

## Files that need to be created
* environment variables (.env or similar)

## Environment Variables
* TOKEN="YOUR DISCORD BOT TOKEN GOES HERE"
* ADMINS="DISCORD USER IDs FOR ADMIN USERs OF BOT"
  * seperate the list of IDs with commas and no spaces
* MONGODB_URL="YOUR MONGODB CONNECTION URL GOES HERE"
* CLIENT_ID="YOUR BOTS DISCORD ID"

## **NOTE**
* Commands can take up to an hour to fully deploy
* If you want your embeds to have a different left bar color, set the variable EMBEDCOLOR in constants.js to the desired color
  * https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812 has the named colors that are available listed
* To use a different string to start commands with (instead of '!!'), change the variable COMMANDCHAR in contants.js
* To change the command for converting to emojis, change the variable EMOJI in contants.js
* tsconfig and the typescript dev-dependency are in case I or anyone else wants to generate .d.ts files for this bot