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
  const doesntSupport = UnSupportedList(supportData)
  const isSupported = SupportedList(supportData)
  const sortofSupported = sortOfSupportedList(supportData)
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
      
      .setTimestamp()
      msg.channel.send(exampleEmbed);
});


function UnSupportedList(item) {

  console.table(item)
  const keys = Object.keys(item); // an array of browser names e.g. ['edge', 'firefox' etc.]
  const amountOfKeys = keys.length // 17ish
  let index = 0;

  let responseString = '';

  while (amountOfKeys > index){
    // I want the object of that browsers support data
    const browserName = keys[index];
    const browser = item[browserName];


    if (!browser.y){
      console.log(browserName)
      console.log(browser)
      responseString += " " + browserName + ", "
      
    }


    index++
  }


  // eventually return the browsers that do support this feature
  console.log(responseString)
  return responseString;
}

function SupportedList(item) {

  console.table(item)


  const keys = Object.keys(item); // an array of browser names e.g. ['edge', 'firefox' etc.]
  const amountOfKeys = keys.length // 17ish
  let index = 0;

  let responseString = '';

  while (amountOfKeys > index){

    const browserName = keys[index];
    const browser = item[browserName];


    if (browser.y){
      console.log(browserName + "v" + browser.y)
      responseString += " " + browserName + " (v." + browser.y + "+)" +  ", " 
      
    }
    index++
  }
  

  // eventually return the browsers that do support this feature
  console.log(responseString)
  return responseString;
}

function sortOfSupportedList(item) {

  console.table(item)

  // how do I access the different keys?
  const keys = Object.keys(item); // an array of browser names e.g. ['edge', 'firefox' etc.]
  const amountOfKeys = keys.length // 17ish
  let index = 0;

  let responseString = '';

  while (amountOfKeys > index){
    // I want the object of that browsers support data
    const browserName = keys[index];
    const browser = item[browserName];

    // console.log(`browser name: ${browserName} browser support data: ${browser}`)

    if (browser.a){
      console.log(browserName + "v" + browser.a)
      responseString += " " + browserName + " (v." + browser.a + "+)" +  ", " 
      
    }
    index++
  }
  

  // eventually return the browsers that do support this feature
  console.log(responseString)
  return responseString;
}

client.login(token);




















































































