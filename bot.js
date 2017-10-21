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
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', (message) => {
    if (message.content.startsWith("!ping")) {
        message.channel.send("pong!");
    }
    console.log(Object.getOwnPropertyNames(message));

});

bot.login(auth.token);