require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { MongoClient, ServerApiVersion } = require('mongodb')
const { MONGODATABASE, MAPCOLLECTION, MESSAGESCOLLECTION } = require('./emojibot_files/constants')

const client = new Client({ intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for(const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.db = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser : true, useUnifiedTopology :true, serverApi  : ServerApiVersion.v1 })
client.db.connect(async error => {
    if(error) {
        console.error(error)
        client.db = undefined
    } else {
        const mapCollection = client.db.db(MONGODATABASE).collection(MAPCOLLECTION)
        const mapDocuments = await mapCollection.find({}).toArray()

        client.conversionMap = {}
        for(const doc of mapDocuments) client.conversionMap[doc.char] = doc.emojis

        console.log('Successfully got the conversion map from the database')

        const messagesCollection = client.db.db('ConversionMap').collection(MESSAGESCOLLECTION)
        const messageDocuments = await messagesCollection.find({}).toArray()
        
        client.builtInMessages = {}
        for(const doc of messageDocuments) client.builtInMessages[doc.label] = doc.message

        console.log('Successfully got the built in messages from the database')
    }
})

client.login(process.env.TOKEN)