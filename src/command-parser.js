export function parseCommand(userInput) {
  const [entity, command, ...rest] = userInput.split(' ');
  if (entity === 'TRAINEE') {
    if (command === 'ADD') {
      addTrainee(rest);
    } else if (command === 'UPDATE') {
      updateTrainee(rest);
    } else if (command === 'DELETE') {
      deleteTrainee(rest);
    } else if (command === 'GET') {
      fetchTrainee(rest);
    } else if (command === 'GETALL') {
      fetchAllTrainees(rest);
    } else {
      console.error("The command for trainee is not found")
    }
  }
  else if (entity === 'COURSE') {
    if (command === 'ADD') {
      addCourse(rest);
    } else if (command === 'UPDATE') {
      updateCourse(rest);
    } else if (command === 'DELETE') {
      deleteCourse(rest);
    } else if (command === 'JOIN') {
      joinCourse(rest);
    } else if (command === 'LEAVE') {
      leaveCourse(rest);
    } else if (command === 'GET') {
      getCourse(rest);
    } else if (command === 'GETALL') {
      getAllCourses(rest);
    } else {
      console.error("The command for course is not found")
    }
  } else {
      console.error("Entity is not found")
    }
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
}
