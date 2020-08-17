require('dotenv').config();

let token = process.env.REALTOKEN

const caniuse = require('caniuse-api')

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (!msg.content.startsWith("!ciu")) {
    return;
  }

  let optionNumbert = msg.content.split(" ")
  let messageTest = optionNumbert[1].toLowerCase();
  let caniuseReply = caniuse.find(messageTest)
  if (caniuseReply === undefined || caniuseReply.length == 0) {
    // array empty or does not exist
    msg.reply("Sorry. I couldn't find what you're looking for.")
    return;
  }



  let resultsArray = caniuseReply.toString().split(",");
  console.log(caniuseReply)
  console.log(resultsArray)
  console.log(resultsArray.length)


  let NumberOfOptions = resultsArray.length;


  // in the event that theres multiple results, it will take the first one
  if (NumberOfOptions >= 2) {
   caniuseReply = caniuseReply[0];
  }
  // single result
  // in the event that it finds 1 it will then say this!
  // msg.channel.send('I found: ' + caniuseReply + "!")
  const supportData = caniuse.getSupport(caniuseReply)
  const featureChoice = caniuseReply;
  const doesntSupport = anotherList(supportData, "n", function(browserName, browserData) {
     return browserName + ', '
  })
  const isSupported = anotherList(supportData, "y", function(browserName, browserData) {
    return browserName + "(" + "v" + browserData.y + ")" +  ', '
  })
  const sortofSupported = anotherList(supportData, "a", function(browserName, browserData) {
     return browserName + "(" + "v" + browserData.a + ")" +  ', '
  })
  supportData.toString();

  // inside a command, event listener, etc.
  const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Can I use: ' + featureChoice + "?")
      .setURL("https://caniuse.com/#search=" + featureChoice)
      .setAuthor('CanIUseBOT', 'https://i.imgur.com/sTkTHO5.jpeg')
      .addFields(
        { name: 'This feature ISNT supported by: ', value: doesntSupport + "."},
        { name: 'This feature IS POTENTIALLY supported by', value: sortofSupported + "."},
        { name: 'This feature IS supported by', value: isSupported + "."}
      )
      .setFooter("Click on header for source")
      .setTimestamp();

      msg.channel.send(exampleEmbed);
});

function anotherList(item, word, callback) {

  let responseString = '';


  // loop through the items values
  for (const browserName in item) {
    // key === browserName
    const Browser = item[browserName]
    // console.log(Browser)
    if (Browser[word]){
      responseString += callback(browserName, Browser)
    }
    
    
  }
  // return the value
  return responseString;
}



client.login(token);