// Import libraries
import Discord from 'discord.js';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import 'dotenv/config';
import 'process';

import * as logger from './lib/logger';

// Enter app directory
process.chdir(__dirname);

// Create discord.js client
const intents = new Discord.Intents();
intents.add(
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
);

const client = new Discord.Client({
    intents: intents
});

// Import config
import config from './config';

// Load all event handlers
let eventList: string[] = fs.readdirSync('./events');

for (const file of eventList)
{
    // Load event
    const event = require(`./events/${file}`); 

    // Assign handler
    if(event.once)
    {
        client.once(event.event, function(...args: any[]) { event.run(client, ...args)});
    }
    else
    {
        client.on(event.event, function(...args: any[]) { event.run(client, ...args)});
    }
}

// Load all commands
let categoryList: string[] = fs.readdirSync('./commands');
let commands: any = {};
let commandAliases: any = [];

for(const cat of categoryList)
{
    // Load category
    const commandList: string[] = fs.readdirSync(`./commands/${cat}`);

    for(const file of commandList)
    {
        // Load command
        const command = require(`./commands/${cat}/${file}`).command;

        logger.log_info(`Loaded command ${command.id}`);

        // Assign command
        if(Array.isArray(command.name))
        {
            // Command has aliases
            for(const name of command.name)
            {
                commands[name] = command;
                commands[name].alias = true;
            }
        }
        else
        {
            commands[command.name] = command;
        }

        commandAliases.push({ id: command.id, names: command.name });
    }
}

client.on('messageCreate', async function(message: Discord.Message) {
    // If message from a bot, ignore
    if(message.author.bot)
    {
       	logger.log_error("Bailing, message was from a bot");
        return;
    }

    // If message doesn't start with prefix, ignore
    if(message.content.indexOf(config.prefix) !== 0)
    {
        logger.log_error("Bailing, message didn't start with prefix");
        return;
    }

    // If channel is a DM, ignore
    if(message.channel.type === 'DM')
    {
        logger.log_error("Bailing, message was from a DM");
        return;
    }

    // Get command
    const args: string[] = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandReq = sanitize(args.shift().toLowerCase());

    try
    {
        // Run command
        const command = commands[commandReq];

        if(command)
        {
            await command.run(client, message, args);
        }
        else
        {
            message.reply(`Command \`${commandReq}\` not found!`);
        }
    }
    catch (err)
    {
        logger.log_fatal(err);

        message.reply(`An error occurred while running command \`${commandReq}\`!`);
    }
});

// Set up error listening
client.on('warn', logger.log_warning);
client.on('error', logger.log_error);

// Login to discord
client.login(process.env.DISCORD_TOKEN);
