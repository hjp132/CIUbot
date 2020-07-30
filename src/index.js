require('dotenv').config();

let token = process.env.REALTOKEN

const caniuse = require('caniuse-api')

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


client.on('message', msg => {
    if (msg.content.startsWith("ciu")) {
        let messageContent = msg.content.split(" ")
        let messageTest = messageContent[1].toLowerCase();
        msg.reply('Can you use ' + messageTest + '? Lets find out..')
        let caniuseReply = caniuse.find(messageTest)
        if (caniuseReply == ""){
            caniuseReply = messageTest
            msg.reply("I'm sorry I can't seem to find what you're looking for.")
        } else {
            msg.reply("I'm looking at " + caniuseReply + ".")
        }

        console.log(caniuseReply)
        let getSupport = caniuse.getSupport(messageTest, true)
        console.log(getSupport)

        let tostringSupport = getSupport.toString();
        msg.reply(tostringSupport)
    }
});

client.login(token);

// TO DO - Implement a caniuseapi and look into if i need npm/superagent

const app = require('./app');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const port = process.env.PORT || 3000;

app.set('port', process.env.PORT);

app.listen(port, () => {
    console.log('Server is up on port ' + port) 
});


const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.use(express.static(path.join(__dirname, '/public')));















