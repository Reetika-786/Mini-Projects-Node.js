import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'create',
    description: 'Creates a new url',
  }
];

const rest = new REST({ version: '10' }).setToken("token here");

(async () => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('1418109772376576161'), { 
    body: commands 
 });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
})();  //this is an IIFE (immediately invoked function expression)