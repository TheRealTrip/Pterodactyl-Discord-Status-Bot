//import discord.js
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('./config.json');
const Nodeactyl = require('nodeactyl');
const client2 = new Nodeactyl.NodeactylClient(config.panelfqdn, config.pteroapikey);



const client = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES]
});




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!` + ` time to get shit done!`);
    
    });


client.on('messageCreate', message => {
if (message.content == config.prefix + 'status') {
    client2.getServerStatus(config.serverid).then(function(serverStatus) {
        if(serverStatus == "running") {
            const embed = new MessageEmbed()
            .setColor('#00d26b')
            .setTitle('Modded Server Status')
            .setDescription('Server is running! :green_circle: ')
            .setTimestamp()
            .setFooter({ text: 'Bot created with love by TheRealTrip' });
            message.channel.send({ embeds: [embed] });
        }else if (serverStatus == "stopped") {
            const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Modded Server Status')
            .setDescription('Server is not running! :red_circle: ')
            .setTimestamp()
            .setFooter({ text: 'Bot created with love by TheRealTrip' });
            message.channel.send({ embeds: [embed] });
        }else if(serverStatus == "starting") {
            const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Modded Server Status')
            .setDescription('Server is starting! :yellow_circle: ')
            .setTimestamp()
            .setFooter({ text: 'Bot created with love by TheRealTrip' });
            message.channel.send({ embeds: [embed] });
        }
            });
        }

    
});

client.on('messageCreate', message => {
if(message.content == config.prefix + 'stop') {
    client2.getServerStatus(config.serverid).then(function(serverStatus) {
        if(serverStatus == "running" || serverStatus == "starting") {
            message.channel.send("Stopping the server! :yellow_circle:");
           client2.stopServer(config.serverid);
           message.channel.send("Server stopped! :red_circle:");
        }else{
            message.channel.send("Server is already stopped! :red_circle:");
        }
    });
    
}
});
client.on('messageCreate', message => {
    if(message.content == config.prefix + 'start') {
        client2.getServerStatus(config.serverid).then(function(serverStatus) {
            if(serverStatus == "offline") {
                message.channel.send("Starting the server! :yellow_circle:");
               client2.startServer(config.serverid);
               message.channel.send("Sent server start request! :green_circle:");
            }else{
                message.channel.send("Server is already running! :green_circle:");
            }
        });
        
    }
    });

client.on('messageCreate', message => {
if(message.content == config.prefix + "help") {
    message.channel.send("Type !status to get the status of the modded server!")
}
});




client.login(config.token)