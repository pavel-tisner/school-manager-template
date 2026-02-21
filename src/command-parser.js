export function parseCommand(userInput) {
  const [entity, command, ...rest] = userInput.split(' ');
  if (entity === 'TRAINEE') {
    if (command === 'ADD') {
      addTrainee(rest);
    }
  }

  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
}
