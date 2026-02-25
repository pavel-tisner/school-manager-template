import { parseCommand } from './command-parser.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

function app() {
  while (true) {
    const command = prompt('Enter command: ');
    if (command === 'QUIT' || command === 'q') {
      console.log('Exit');
      return;
    }
    parseCommand(command);q
  }
}
app();
