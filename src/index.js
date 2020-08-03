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

        // if !option x is invalid then don't take it as a response
        //to test (ie - resultsarray[messagecontent[X]] )
        const optionNumber = msg.content.split(" ")[1]

        // Is optionNumber a valid choice?
        if(resultsArray[optionNumber] == undefined) {
          msg.reply('nope')
          return
        }

        const featureChoice =  resultsArray[optionNumber];
        msg.reply("Looking for results for " + featureChoice);
        const supportData = caniuse.getSupport(featureChoice)

        const doesntSupport = SupportedList(supportData)
        // call formatting function here
        msg.reply("This feature isn't supported by: ")
        msg.channel.send("> " + doesntSupport)

        // call formatting function here
      }
    })

  }
  // single result
  else {
    // in the event that it finds 1 it will then say this!
    msg.reply('I found: ' + caniuseReply + "!")
    const supportData = caniuse.getSupport(caniuseReply)

    const doesntSupport = SupportedList(supportData)
    // call formatting function here
    msg.reply("This feature isn't supported by: ")
    msg.channel.send("> " + doesntSupport)
    
  }


});


function SupportedList(item) {

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

    
    if (!browser.y){
      console.log(browserName)
      responseString += " " + browserName + ", "
      
    }


    index++
  }
  // what fields do I caare about?

  // eventually return the browsers that do support this feature
  console.log(responseString)
  return responseString;
}

client.login(token);











































































