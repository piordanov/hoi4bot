const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

const config = require('./config.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
//initialize bot
const bot = new Discord.Client();
let reminders = {};

bot.on('ready', () => {
    logger.info('Connected');
    //TODO load reminders

});


const prefix = '!';
bot.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // console.log(command);
    // console.log(args);

    if (command === "ping") {
        logger.info(message.author.id + " sent pong");
        message.channel.send("pong!");
    }

    else if (command === "splurt"){
        const [name, n] = args;
        const emoji = bot.emojis.find("name", name);
        if (emoji != null) {
            let result = emoji.toString().repeat(parseInt(n));
            message.channel.send(`${result}`)
                .then((msg) => {
                    logger.info(`Spammed server`);
                })
                .catch((error) => {
                    logger.error(error);
                    message.channel.send(`${message.author}: Content too large, please send a smaller request`);
                });
        }
        else {
            logger.error("emoji not found");
            message.channel.send("Emoji not found");
        }

    }
    else if (command === "listemojis") {
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        if (emojiList.length > 0) {
            message.channel.send(emojiList);
        }
        else {
            logger.error("no emojis found?");
        }
    }

    else if (command === "set") {
        let [time, weekday, ...txt] = args;
        let id = reminders.length + 1;
        logger.info("Setting Reminder" );

        let date = new Date()
        reminders[id] = {
            'datetime': date,
            'text': txt
        }

        message.reply(`Setting reminder for ${weekday} at ${time} with text ${txt}. Cheers!`);


    }

    else if (command === "remove") {
        let [name] = args;
        logger.info("Destroying Reminder");
        message.reply(`Removing reminder ${name} `);
    }

    

});

bot.login(auth.token);