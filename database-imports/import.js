const conversionMap = [
  {
    char: '0',
    emojis: [':zero:']
  },
  {
    char: '1',
    emojis: [':one:', ':repeat_one:']
  },
  {
    char: '2',
    emojis: [':two:']
  },
  {
    char: '3',
    emojis: [':three:']
  },
  {
    char: '4',
    emojis: [':four:']
  },
  {
    char: '5',
    emojis: [':five:']
  },
  {
    char: '6',
    emojis: [':six:']
  },
  {
    char: '7',
    emojis: [':seven:']
  },
  {
    char: '8',
    emojis: [':eight:']
  },
  {
    char: '9',
    emojis: [':nine:']
  },
  {
    char: 'A',
    emojis: [':a:', ':regional_indicator_a:', '<:a:887091084554039406>']
  },
  {
    char: 'B',
    emojis: [':b:', ':regional_indicator_b:', '<:b:887091134940192778>']
  },
  {
    char: 'C',
    emojis: [
      '<:ccc:882670792582762506>',
      ':regional_indicator_c:',
      ':copyright:',
      '<:c:887091168289124406>'
    ]
  },
  {
    char: 'D',
    emojis: [':regional_indicator_d:', '<:d:887091168637235200>']
  },
  {
    char: 'E',
    emojis: [':e_mail:', ':regional_indicator_e:', '<:e:887091168549163058>']
  },
  {
    char: 'F',
    emojis: [':regional_indicator_f:', '<:f:887091168591085568>']
  },
  {
    char: 'G',
    emojis: [
      '<:G_:881974742326857828>',
      ':regional_indicator_g:',
      '<:g:887091168536567899>'
    ]
  },
  {
    char: 'H',
    emojis: [
      '<:hhh:882271553939722281>',
      ':regional_indicator_h:',
      '<:h:887091168259743746>'
    ]
  },
  {
    char: 'I',
    emojis: [
      '<:I_:881975861333606440>',
      ':regional_indicator_i:',
      '<:i:887091168293322782>'
    ]
  },
  {
    char: 'J',
    emojis: [':regional_indicator_j:', '<:j:887091168628854804>']
  },
  {
    char: 'K',
    emojis: [':regional_indicator_k:', '<:k:887091168784048169>']
  },
  {
    char: 'L',
    emojis: [':regional_indicator_l:', '<:l:887091168570114078>']
  },
  {
    char: 'M',
    emojis: [':m:', ':regional_indicator_m:', '<:m:887091168557547530>']
  },
  {
    char: 'N',
    emojis: [':regional_indicator_n:', '<:n:887091168247156827>']
  },
  {
    char: 'O',
    emojis: [
      ':o:',
      ':regional_indicator_o:',
      ':o2:',
      '<:o:887091168406569040>'
    ]
  },
  {
    char: 'P',
    emojis: [
      ':regional_indicator_p:',
      ':parking:',
      '<:p:887091168435920946>'
    ]
  },
  {
    char: 'Q',
    emojis: [':regional_indicator_q:', '<:q:887091168511418448>']
  },
  {
    char: 'R',
    emojis: [
      '<:R_:881975539169120267>',
      ':regional_indicator_r:',
      '<:r:887091168213631048>'
    ]
  },
  {
    char: 'S',
    emojis: [
      '<:sss:882271624294989834>',
      ':regional_indicator_s:',
      '<:s:887091168603701298>'
    ]
  },
  {
    char: 'T',
    emojis: [
      '<:10:881976704069926943>',
      ':regional_indicator_t:',
      '<:t:887091168356216892>'
    ]
  },
  {
    char: 'U',
    emojis: [
      '<:uuu:882671601005494303>',
      ':regional_indicator_u:',
      '<:u:887091168385572894>'
    ]
  },
  {
    char: 'V',
    emojis: [':regional_indicator_v:', '<:v:887091168440102982>']
  },
  {
    char: 'W',
    emojis: [':regional_indicator_w:', '<:w:887091168691757076>']
  },
  {
    char: 'X',
    emojis: [
      ':x:',
      ':heavy_multiplication_x:',
      ':regional_indicator_x:',
      ':negative_squared_cross_mark:',
      '<:x:887091168507211836>'
    ]
  },
  {
    char: 'Y',
    emojis: [':regional_indicator_y:', '<:y:887091168746278912>']
  },
  {
    char: 'Z',
    emojis: [':regional_indicator_z:', ':zzz:', '<:z:887091168373006368>']
  },
  {
    char: '+',
    emojis: [':heavy_plus_sign:']
  },
  {
    char: '@',
    emojis: ['@']
  },
  {
    char: '?',
    emojis: [':question:', ':grey_question:']
  },
  {
    char: '.',
    emojis: ['.']
  },
  {
    char: '!',
    emojis: [':exclamation:', ':grey_exclamation:', ':heart_exclamation:']
  },
  {
    char: ',',
    emojis: [',']
  },
  {
    char: "'",
    emojis: ["'"]
  },
  {
    char: '/',
    emojis: ['/']
  },
  {
    char: '(',
    emojis: ['(']
  },
  {
    char: ')',
    emojis: [')']
  },
  {
    char: '>',
    emojis: ['>']
  },
  {
    char: '<',
    emojis: ['<']
  },
  {
    char: ':',
    emojis: [':']
  },
  {
    char: '_',
    emojis: ['_']
  },
  {
    char: '-',
    emojis: ['-']
  },
  {
    char: '#',
    emojis: ['#']
  }
]

const builtInMessages = [
  {
    label: 'grit',
    message: '<:G_:881974742326857828> <:R_:881975539169120267> <:I_:881975861333606440> <:10:881976704069926943>'
  },
  {
    label: 'big_oof',
    message: ':b: <:I_:881975861333606440> <:G_:881974742326857828>   <:oof:879551416056836106>'
  },
  {
    label: 'succ',
    message: '<:sss:882271624294989834> <:uuu:882671601005494303> <:ccc:882670792582762506> <:ccc:882670792582762506> <:funnyrelatable2:879479344022569000>'
  },
  {
    label: 'jawn',
    message: ':regional_indicator_j: :a: :regional_indicator_w: :regional_indicator_n:'
  },
  {
    label: 'sf',
    message: ':a: :regional_indicator_l: :regional_indicator_l:   :m: :regional_indicator_y:   <:hhh:882271553939722281> :o: :m: <:I_:881975861333606440> :regional_indicator_e: <:sss:882271624294989834>   :regional_indicator_l: :o: :regional_indicator_v: :regional_indicator_e:   <:sss:882271624294989834> :a: :regional_indicator_l: :regional_indicator_e: <:sss:882271624294989834> :regional_indicator_f: :o: <:R_:881975539169120267> <:ccc:882670792582762506> :regional_indicator_e:'
  },
  {
    label: 'homies',
    message: '<:kissing_the_homies:880446604312731748>'
  },
  {
    label: 'emjoi',
    message: ':heart_exclamation: :regional_indicator_e: :regional_indicator_m: <:j_:887091168628854804> :o2: <:I_:881975861333606440>'
  },
  {
    label: 'cuss',
    message: '<:ccc:882670792582762506> <:uuu:882671601005494303> <:sss:882271624294989834> <:sss:882271624294989834>'
  },
  {
    label: 'dude',
    message: '<:gritty:881974805333680229>'
  },
  {
    label: 'pog',
    message: '<:cursedpog:882668904281960478>'
  },
  {
    label: 'ez',
    message: ':regional_indicator_e: :zzz:'
  },
  {
    label: 'ahhh',
    message: ':sob::mega::regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a: :regional_indicator_a:'
  }
]

require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const { MONGODATABASE, MAPCOLLECTION, MESSAGESCOLLECTION } = require('../emojibot_files/constants')

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser : true, useUnifiedTopology :true, serverApi  : ServerApiVersion.v1 })
client.connect(async error => {
  if(!error) {
    await client.db(MONGODATABASE).collection(MAPCOLLECTION).insertMany(conversionMap)
    await client.db(MONGODATABASE).collection(MESSAGESCOLLECTION).insertMany(builtInMessages)
    client.close()

    console.log('Successfully imported all data')
  } else console.error(error)
})