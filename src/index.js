const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('token');




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


// const router = express.Router();
// app.use('/',router);

// // CRUD create read update delete


// const { routes } = require('./app');






// router.get('/', function(req, res) {
//     // Get the only one db instance in our app
//     var db = req.db;
 
//     // Fetch from 'users' collection
//     var userCollection = db.get("chest-1");
//     userCollection.find({}, {}, function(e, docs) {
//           res.render('user-list', {'userlist' : docs});
//     });
// });


app.get('/', (req, res) => {
    res.render('intro')
});














