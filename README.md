# EmojiBot_JS

## Before Running
* Setup a mongodb cluster
  * In this cluster, set up a database called ConversionMap (or rename the variable MONGODATABASE in constants.js to whatever you name it)
  * In the ConversionMap database, setup collections : 
    * BuiltInMessage (or rename the variable MESSAGESCOLLECTION in constants.js to whatever you name it)
    * Character (or rename the variable MAPCOLLECTION in constants.js to whatever you name it)
    * CronJob (or rename the variable CRONCOLLECTION in constants.js to whatever you name it)
* Run the following command
  * npm run import
* Setup the mentioned Environment Variables
* Once everything above is setup and successful, run the program with the following command
  * npm run start
  * *Note:* This will automatically deploy the commands, which as mentioned later can take up to an hour to deploy

## Files that need to be created
* environment variables (.env or similar)

## Environment Variables
* TOKEN="YOUR DISCORD BOT TOKEN GOES HERE"
* ADMIN="DISCORD USER ID FOR ADMIN USER OF BOT"
* MONGODB_URL="YOUR MONGODB CONNECTION URL GOES HERE"
* CLIENT_ID="YOUR BOTS DISCORD ID"

## **NOTE**
* Commands can take up to an hour to fully deploy
* If you want your embeds to have a different left bar color, set the variable EMBEDCOLOR in constants.js to the desired color
  * https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812 has the named colors that are available listed
* To use a different string to start commands with (instead of '!!'), change the variable COMMANDCHAR in contants.js
* To change the command for converting to emojis, change the variable EMOJI in contants.js
