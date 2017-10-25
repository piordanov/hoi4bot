const Discord = require('discord.js');
const logger = require('winston');
const schedule = require('node-schedule');

const auth = require('./auth.json');
const config = require('./config.json');
const help = require('./help.json');
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

    else if (command === "pong") {
        logger.info(message.author.id + " sent ping");
        message.channel.send("ping!");
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

    else if (command === "help") {
        let [arg] = args;
        if (arg === undefined) {
            arg = command;
        }
        let response = "";
        if (arg === command) {
            Object.keys(help).forEach((key) => {
                response += `${key}: ${help[key]}\n`;
            });
        }
        else {
            response = `${arg}: ${help[arg]}`;
        }
        message.reply(`\n${response}`);
    }

    else if (command === "set") {
        let [month, day, year, time, ...txt] = args;
        let id = new String("Reminder:" + reminders.length);

        logger.info("Setting Reminder" );
        let date = new Date([[ month, day, year, time].join(" ")]);
        reminders[id] = {
            'date': date,
            'txt': txt
        };
        schedule.scheduleJob(id, date, () => {
            message.channel.send(`${message.channel}: ${txt} `);
        });

        message.reply(`Set reminder ${id} for ${date}. Cheers!`);


    }

    else if (command === "remove") {
        let [id] = args;
        logger.info(reminders);
        logger.info("Destroying Reminder");
        logger.info(schedule.scheduledJobs);
        schedule.scheduledJobs[id].cancel();
        reminders[id] = null;
        console.log(reminders.length);
        message.reply(`Removed reminder ${id} `);
    }

    

});

bot.login(auth.token);