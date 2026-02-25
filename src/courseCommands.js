import { loadTraineeData, saveCourseData, loadCourseData } from './storage.js';
import chalk from 'chalk';

function addCourse(param) {
  if (param.length !== 2) {
    console.error(chalk.red('ERROR: Must provide course name and start date'));
    return false;
  }

  const [name, startDate] = param;
  const splittedDate = startDate.split('-').map(Number);
  if (splittedDate.length !== 3) {
    console.error(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
    return false;
  }

  const [year, month, day] = splittedDate;
  if (year < 2025 || year > 2050) {
    console.error(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
    return false;
  } else if (month < 1 || month > 12) {
    console.error(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
    return false;
  } else if (day < 1 || day > 31) {
    console.error(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
    return false;
  }

  const id = Math.floor(Math.random() * 100000);
  const courses = loadCourseData();
  const newCourse = {
    id,
    name,
    startDate,
    participants: [],
  };
  courses.push(newCourse);
  saveCourseData(courses);
  console.log(`CREATED: ${id} ${name} ${startDate}`);
  return newCourse;
}

function updateCourse(param) {
  if (param.length !== 3) {
    console.error(chalk.red('ERROR: Must provide ID, name and start date'));
    return false;
  }

  let [id, name, startDate] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error(chalk.red('ERROR: ID must be a number'));
    return false;
  }

  const courses = loadCourseData();
  const exists = courses.some((course) => course.id === id);
  if (!exists) {
    console.error(chalk.red(`ERROR: Course with ID ${id} does not exist`));
    return false;
  }

  const updatedCourses = courses.map((course) =>
    course.id === id ? { ...course, name, startDate } : course
  );
  saveCourseData(updatedCourses);
  console.log(`UPDATED: ${id} ${name} ${startDate}`);
  return true;
}

function deleteCourse(param) {
  if (param.length !== 1) {
    console.error(chalk.red('ERROR: Must provide ID'));
    return false;
  }

  let [id] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error(chalk.red('ERROR: ID must be a number'));
    return false;
  }

  const courses = loadCourseData();
  const courseToDelete = courses.find((course) => course.id === id);
  if (!courseToDelete) {
    console.error(chalk.red(`ERROR: Course with ID ${id} does not exist`));
    return false;
  }

  const updatedCourses = courses.filter((course) => course.id !== id);
  saveCourseData(updatedCourses);
  console.log(`DELETED: ${id} ${courseToDelete.name}`);
  return true;
}

export function joinCourse(param) {
  if (param.length !== 2) {
    console.error(chalk.red('ERROR: Must provide course ID and trainee ID'));
    return false;
  }

  const [courseID, traineeID] = param.map(Number);
  if (isNaN(courseID) || isNaN(traineeID)) {
    console.error(chalk.red('ERROR: course ID and trainee ID must be numbers'));
    return false;
  }

  const courses = loadCourseData();
  const updatedCourse = courses.find((c) => c.id === courseID);
  if (!updatedCourse) {
    console.error(
      chalk.red(`ERROR: Course with ID ${courseID} does not exist`)
    );
    return false;
  }

  const trainees = loadTraineeData();
  const trainee = trainees.find((t) => t.id === traineeID);
  if (!trainee) {
    console.error(
      chalk.red(`ERROR: Trainee with ID ${traineeID} does not exist`)
    );
    return false;
  }

  if (updatedCourse.participants.includes(traineeID)) {
    console.error(
      chalk.red(`ERROR: The Trainee has already joined this course`)
    );
    return false;
  }

  if (updatedCourse.participants.length >= 20) {
    console.error(chalk.red(`ERROR: The course is full`));
    return false;
  }

  if (
    courses.filter((course) => course.participants.includes(traineeID))
      .length >= 5
  ) {
    console.error(
      chalk.red(`ERROR: A trainee is not allowed to join more than 5 courses`)
    );
    return false;
  }

  updatedCourse.participants.push(traineeID);
  const updatedCourses = courses.map((c) =>
    c.id === courseID ? updatedCourse : c
  );
  saveCourseData(updatedCourses);
  console.log(
    `${trainee.firstName} ${trainee.lastName} joined ${updatedCourse.name}`
  );
  return true;
}

function leaveCourse(param) {
  if (param.length !== 2) {
    console.error(chalk.red('ERROR: Must provide course ID and trainee ID'));
    return false;
  }

  const [courseID, traineeIDtoLeave] = param.map(Number);
  if (isNaN(courseID) || isNaN(traineeIDtoLeave)) {
    console.error(chalk.red('ERROR: course ID and trainee ID must be numbers'));
    return false;
  }

  const courses = loadCourseData();
  const course = courses.find((c) => c.id === courseID);
  if (!course) {
    console.error(
      chalk.red(`ERROR: Course with ID ${courseID} does not exist`)
    );
    return false;
  }

  const trainees = loadTraineeData();
  const traineeToLeave = trainees.find((t) => t.id === traineeIDtoLeave);
  if (!traineeToLeave) {
    console.error(
      chalk.red(`ERROR: Trainee with ID ${traineeIDtoLeave} does not exist`)
    );
    return false;
  }

  if (!course.participants.includes(traineeIDtoLeave)) {
    console.error(chalk.red(`ERROR: The Trainee did not join the course`));
    return false;
  }

  const courseParticipants = course.participants.filter(
    (traineeID) => traineeID !== traineeIDtoLeave
  );

  const updatedCourses = courses.map((c) =>
    c.id === courseID ? { ...course, participants: courseParticipants } : c
  );

  saveCourseData(updatedCourses);
  console.log(
    `${traineeToLeave.firstName} ${traineeToLeave.lastName} left ${course.name}`
  );
  return true;
}

function getCourse(param) {
  if (param.length !== 1) {
    console.error(chalk.red('ERROR: Must provide ID'));
    return false;
  }

  let [id] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error(chalk.red('ERROR: ID must be a number'));
    return false;
  }

  const courses = loadCourseData();
  const foundCourse = courses.find((course) => course.id === id);
  if (!foundCourse) {
    console.error(chalk.red(`ERROR: Course with ID ${id} does not exist`));
    return false;
  }

  const trainees = loadTraineeData();

  const totalNum = foundCourse.participants.length;
  const normalizedData = foundCourse.participants.map((participantID) =>
    trainees.find((trainee) => trainee.id === participantID)
  );
  // const findParticipant = (participantID) =>
  //   trainees.find((participant) => participant.id === participantID);
  // const participantsList = foundCourse.participants
  //   .map(
  //     (participantID) =>
  //       `- ${participantID} ${findParticipant(participantID).firstName} ${findParticipant(participantID).lastName}`
  //   )
  //   .join('\n');

  const participantsList = normalizedData
    .map(({ id, firstName, lastName }) => `- ${id} ${firstName} ${lastName}`)
    .join('\n');

  console.log(`
${id} ${foundCourse.name} ${foundCourse.startDate}
Participants (${totalNum}):
${participantsList}`);
}

function getAllCourses() {
  const courses = loadCourseData();
  const sortedCourses = courses.sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  const coursesOutput = sortedCourses
    .map(({ id, name, startDate, participants }) => {
      const isFull = participants.length >= 20 ? 'Full' : '';
      return `${id} ${name} ${startDate} ${participants.length} ${isFull}`;
    })
    .join('\n');
  const totalNum = sortedCourses.length;
  console.log(`
Courses:
${coursesOutput}

Total: ${totalNum}
`);
  return true;
}

export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      return addCourse(args);

    case 'UPDATE':
      return updateCourse(args);

    case 'DELETE':
      return deleteCourse(args);

    case 'JOIN':
      return joinCourse(args);

    case 'LEAVE':
      return leaveCourse(args);

    case 'GET':
      return getCourse(args);

    case 'GETALL':
      return getAllCourses();

    default:
      console.error(chalk.red(`Unknown course subcommand: ${subcommand}`));
      return false;
  }
}
