import { handleTraineeCommand } from './traineeCommands.js';
import { handleCourseCommand } from './courseCommands.js';
import chalk from 'chalk';

export function parseCommand(userInput) {
  const [command, subcommand, ...rest] = userInput.split(' ');
  if (command === 'TRAINEE') {
    handleTraineeCommand(subcommand, rest);
  } else if (command === 'COURSE') {
    handleCourseCommand(subcommand, rest);
  } else {
    console.error(chalk.red('Command is not found'));
  }
}
