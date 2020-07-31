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

let resultsArray = [];
// let iterateIndex;
let messageContent


client.on('message', msg => {
  if (msg.content.startsWith("!ciu")) {
      messageContent = msg.content.split(" ")
      let messageTest = messageContent[1].toLowerCase();
      msg.reply('Can you use ' + messageTest + '? Lets find out..')
      let caniuseReply = caniuse.find(messageTest)
      

      //if it finds multiple options for you to pick from it splits and turns into an array
      // (console logs for debugging please delete when finished, idiot)
      resultsArray = caniuseReply.toString().split(",");
      console.log(caniuseReply)
      console.log(resultsArray)
      console.log(resultsArray.length)

      //in the event that there is multiple options it will let you pick what one you meant
      let NumberOfOptions = resultsArray.length;
      if (NumberOfOptions >= 2) {
        console.log("theres multiple here bro")
        msg.reply("Please pick between the following: (!option x)")
        let resultsIndex = 0;
        resultsArray.forEach( () => {
          msg.reply(resultsIndex + " - " + resultsArray[resultsIndex])
          resultsIndex++;
        })
        // this now goes to the !option event handler at the next function VVV
        client.on('message', msg => {
          if (msg.content.startsWith("!option")) {
            messageContent = msg.content.split(" ")
            console.log("you chose: " + messageContent[1] + "right?")
            msg.reply("Looking for results for " + resultsArray[messageContent[1]])
          }
        })

      } else {
        // in the event that it finds 1 it will then say this!
        msg.reply('I found: ' + caniuseReply + "!")
      }


  //     if (caniuseReply == "" || caniuseReply == null || caniuseReply == undefined){
  //         caniuseReply = messageTest
  //         msg.reply("I'm sorry I can't seem to find what you're looking for.")
  //     } else {
  //         msg.reply("I'm looking at " + caniuseReply[0] + ".")
  //     }

  //     console.log("mesage test " + messageTest)
  //     console.log("caniusereply " + caniuseReply)

  //     //in instance when there are multiple give the option to pick between the array
    
  //     let getSupport;
  //     if (typeof caniuseReply === 'string'){
  //       getSupport = caniuse.getSupport(caniuseReply, false)
  //       console.log(getSupport)
  //     } else {
  //       getSupport = caniuse.getSupport(caniuseReply[0], false)
  //       console.log(getSupport)
  //     }
      
 

  //     let tostringSupport = getSupport.toString();
  //     msg.reply(tostringSupport)
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















