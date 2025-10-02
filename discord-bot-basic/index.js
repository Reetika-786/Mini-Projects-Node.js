

import { Client, GatewayIntentBits, Events } from 'discord.js';
import express from 'express';
import { nanoid } from 'nanoid';


//this client is kind of a virtual user jiske through we interact with discord api(server)

const client = new Client({ 
    intents: [
       GatewayIntentBits.Guilds,          // for slash commands
    GatewayIntentBits.GuildMessages,   // for text messages
    GatewayIntentBits.MessageContent,  // so bot can read message content
    ]
 });
//these guilds are ki hm kis tarah ka access dena chahte hain client ko


// ---------------- URL Shortener Logic ----------------
const urlDatabase = {}; 
const app = express();
const PORT = 3000;


// Route to handle short URL access
app.get('/:shortId', (req, res) => {
  const shortId = req.params.shortId;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`);
});


// ---------------- Discord Bot ----------------
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});


// 🔹 Normal message handling 
client.on('messageCreate', message =>{
    // console.log(message); //for whole info of message
    // console.log(message.content); //for only content of message
     if (message.author.bot) return; // avoid bot replying to itself

  // simple "hi" reply
  if (message.content.toLowerCase() === 'hi') {
    return message.reply('hi from bot');
  }

  // simple "ping" reply
  if (message.content.toLowerCase() === 'ping') {
    return message.reply('pong!');
  }

  // short URL creation (normal message)
  if (message.content.startsWith('create ')) {
    const url = message.content.split('create ')[1]; // get whatever comes after 'create '

    if (!url || !url.startsWith('http')) {
      return message.reply(' Please provide a valid URL starting with http/https.');
    }

    // generate short URL
    const shortId = nanoid(6);
    urlDatabase[shortId] = url;

    const shortUrl = `http://localhost:${PORT}/${shortId}`;
    return message.reply(`✅ Short URL created: ${shortUrl}`);
  }
});

// //interaction with discord api : our own commands
// client.on('interactionCreate', interaction =>{
//     //console.log(interaction);
//     interaction.reply("Pong!!");
// });



client.login("token here");