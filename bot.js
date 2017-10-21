const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});


bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', (message) =>{
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    console.log(Object.getOwnPropertyNames(message));
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;

            case 'memeplz':
                bot.sendMessage({
                    to: channelID,
                    message: "@" + user + " only the freshest!"
                });
                // bot.sendFile(message, '"http://www.reddit.com/r/pics.json?jsonp=?",', 'kappa.jpg', 'Check out this cool file!', (err, m) => {
                //         if (err) console.log(err);
                // });
                break;

            case 'nyet':
                bot.sendMessage({
                    to: channelID,
                    message: "NYET"
                });

                break;
            // Just add any case commands if you want to..
         }
     }
});
//     // Create an event listener for new guild members
// bot.on('guildMemberAdd', member => {
//   // Send the message to the guilds default channel (usually #general), mentioning the member
//   member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);

//   // If you want to send the message to a designated channel on a server instead
//   // you can do the following:
//   const channel = member.guild.channels.find('name', 'member-log');
//   // Do nothing if the channel wasn't found on this server
//   if (!channel) return;
//   // Send the message, mentioning the member
//   channel.send(`Welcome to the server, ${member}`);
// });
