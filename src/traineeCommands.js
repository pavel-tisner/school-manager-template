import { saveTraineeData, loadTraineeData, loadCourseData } from './storage.js';

function addTrainee(param) {
  if (param.length !== 2) {
    console.error('Must provide first and last name');
    return false;
  }
  const [firstName, lastName] = param;
  const id = Math.floor(Math.random() * 100000);
  const trainees = loadTraineeData();
  const newTrainee = {
    id,
    firstName,
    lastName,
  };
  trainees.push(newTrainee);
  saveTraineeData(trainees);
  console.log(`CREATED: ${id} ${firstName} ${lastName}`);
  return newTrainee;
}

function updateTrainee(param) {
  if (param.length !== 3) {
    console.error('ERROR: Must provide ID, first name and last name');
    return false;
  }
  let [id, firstName, lastName] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error('ERROR: ID must be a number');
    return false;
  }
  const trainees = loadTraineeData();
  const exists = trainees.some((trainee) => trainee.id === id);
  if (!exists) {
    console.error(`ERROR: Trainee with ID ${id} does not exist`);
    return false;
  }
  const updatedTrainees = trainees.map((trainee) =>
    trainee.id === id ? { ...trainee, firstName, lastName } : trainee
  );
  saveTraineeData(updatedTrainees);
  console.log(`UPDATED: ${id} ${firstName} ${lastName}`);
  return true;
}
// - Invalid ID → `ERROR: Trainee with ID <ID> does not exist`
// - Missing parameters → `ERROR: Must provide ID, first name and last name`

function deleteTrainee(param) {
  if (param.length !== 1) {
    console.error('ERROR: Must provide ID');
    return false;
  }
  let [id] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error('ERROR: ID must be a number');
    return false;
  }
  const trainees = loadTraineeData();
  const traineeToDelete = trainees.find((trainee) => trainee.id === id);
  if (!traineeToDelete) {
    console.error(`ERROR: Trainee with ID ${id} does not exist`);
    return false;
  }
  const updatedTrainees = trainees.filter((trainee) => trainee.id !== id);
  saveTraineeData(updatedTrainees);
  console.log(
    `DELETED: ${id} ${traineeToDelete.firstName} ${traineeToDelete.lastName}`
  );
  return true;
  // Invalid ID → ERROR: Trainee with ID <ID> does not exist
}

function fetchTrainee(param) {
  if (param.length !== 1) {
    console.error('ERROR: Must provide ID');
    return false;
  }
  let [id] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error('ERROR: ID must be a number');
    return false;
  }
  const trainees = loadTraineeData();
  const foundTrainee = trainees.find((trainee) => trainee.id === id);
  if (!foundTrainee) {
    console.error(`ERROR: Trainee with ID ${id} does not exist`);
    return false;
  }
  const courses = loadCourseData();
  const enrolledCourses = courses.filter((course) =>
    course.participants.includes(id)
  );

  console.log(`${id} ${foundTrainee.firstName} ${foundTrainee.lastName}`);
  if (enrolledCourses.length === 0) {
    console.log('Courses: None');
  } else {
    console.log(
      `Courses: ${enrolledCourses.map((course) => course.name).join(', ')}`
    );
  }

  return true;
  // Invalid ID → ERROR: Trainee with ID <ID> does not exist
}

function fetchAllTrainees() {
  const trainees = loadTraineeData();
  const sortedTrainees = trainees.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );
  const traineesOutput = sortedTrainees
    .map(({id,firstName,lastName}) => `${id} ${firstName} ${lastName}`)
    .join('\n');
  const totalNum = trainees.length;
  console.log(`
Trainees:
${traineesOutput}

Total: ${totalNum}
`);
  return true;
}

export function handleTraineeCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      return addTrainee(args);

    case 'UPDATE':
      return updateTrainee(args);

    case 'DELETE':
      return deleteTrainee(args);

    case 'GET':
      return fetchTrainee(args);

    case 'GETALL':
      return fetchAllTrainees();

    default:
      console.error(`Unknown trainee subcommand: ${subcommand}`);
      return false;
  }
  // Read the subcommand and call the appropriate function with the arguments
}

// export {
//   // addTrainee,
//   // updateTrainee,
//   // deleteTrainee,
//   // fetchTrainee,
//   // fetchAllTrainees,
//   handleTraineeCommand
// };
