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

let isSupported;

client.on('message', msg => {
  if (!msg.content.startsWith("!ciu")) {
    return;
  }

  let messageContent = msg.content.split(" ")
  let messageTest = messageContent[1].toLowerCase();
  msg.reply('Can you use ' + messageTest + '? Lets find out..')
  let caniuseReply = caniuse.find(messageTest)


  //if it finds multiple options for you to pick from it splits and turns into an array
  // (console logs for debugging please delete when finished, idiot)
  let resultsArray = caniuseReply.toString().split(",");
  console.log(caniuseReply)
  console.log(resultsArray)
  console.log(resultsArray.length)

  //in the event that there is multiple options it will let you pick what one you meant
  let NumberOfOptions = resultsArray.length;


  // multiple results
  if (NumberOfOptions >= 2) {
    console.log("theres multiple here bro")
    // ask user to pick 1 of the options
    msg.reply("Please pick between the following: (!option x)")
    
    resultsArray.forEach((value, i) => {
      msg.reply(i + " - " + value)
    })
    // this now goes to the !option event handler at the next function VVV
    client.on('message', msg => {
      // parse the option they chose
      if (msg.content.startsWith("!option")) {
        messageContent = msg.content.split(" ")
        const featureChoice =  resultsArray[messageContent[1]];
        msg.reply("Looking for results for " + featureChoice);
        isSupported = caniuse.getSupport(featureChoice)
        isSupported = JSON.stringify(isSupported)
        msg.reply(isSupported)

      }
    })

  }
  // single result
  else {
    // in the event that it finds 1 it will then say this!
    msg.reply('I found: ' + caniuseReply + "!")
    isSupported = caniuse.getSupport(caniuseReply)
    isSupported = JSON.stringify(isSupported)
    msg.reply(isSupported)
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

  // let getSupport;
  // if (typeof caniuseReply === 'string') {
  //   getSupport = caniuse.getSupport(caniuseReply, true)
  //   console.log(getSupport)
  // } else {
  //   getSupport = caniuse.getSupport(caniuseReply[0], true)
  //   console.log(getSupport)
  // }

  // msg.reply("Results:" + JSON.stringify(getSupport))



  //     let tostringSupport = getSupport.toString();
  //     msg.reply(tostringSupport)

});



client.login(token);

















