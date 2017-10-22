const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
//initialize bot
const bot = new Discord.Client();


bot.on('ready', () => {
    logger.info('Connected');
});


const prefix = '!';
bot.on('message', (message) => {
    
    if (message.content.startsWith(prefix + "ping")) {
        console.log(message.author.id);
        message.channel.send("pong!");
    }
    else if(message.content.startsWith(prefix + "nyet")) {
        message.channel.send("", {
            file: new FileOptions("")
        });
    }
    

});

bot.login(auth.token);