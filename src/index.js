import { parseCommand } from './command-parser.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

function app() {
  const command = prompt('Enter command: ');
  if (command === 'QUIT' || command === 'q') {
    console.log('Exit');
    return;
  }

  parseCommand(command);
}
app()

// QUIT or q
// This is the entry point of your application.
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.
