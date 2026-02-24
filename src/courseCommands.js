import { saveCourseData, loadCourseData } from './storage.js';

function addCourse(param) {
  if (param.length !== 2) {
    console.error('ERROR: Must provide course name and start date');
    return false;
  }
  const [name, startDate] = param;
  const splittedDate = startDate.split('-').map(Number);
  if (splittedDate.length !== 3) {
    console.error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
    return false;
  }
  const [year, month, day] = splittedDate;
  if (year < 2025 || year > 2050) {
    console.error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
    return false;
  } else if (month < 1 || month > 12) {
    console.error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
    return false;
  } else if (day < 1 || day > 31) {
    console.error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
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
  //     - Missing parameters → `ERROR: Must provide course name and start date`
  // - Invalid date → `ERROR: Invalid start date. Must be in yyyy-MM-dd format`
  // TODO: Implement logic
}

function updateCourse(param) {
  if (param.length !== 3) {
    console.error('ERROR: Must provide ID, name and start date');
    return false;
  }
  let [id, name, startDate] = param;
  id = Number(id);
  if (isNaN(id)) {
    console.error('ERROR: ID must be a number');
    return false;
  }
  const courses = loadCourseData();
  const exists = courses.some((course) => course.id === id);
  if (!exists) {
    console.error(`ERROR: Course with ID ${id} does not exist`);
    return false;
  }
  const updatedCourses = courses.map((course) =>
    course.id === id ? { ...course, name, startDate } : course
  );
  saveCourseData(updatedCourses);
  console.log(`UPDATED: ${id} ${name} ${startDate}`);
  return true;
  // - Invalid ID → `ERROR: Course with ID <ID> does not exist`
  // - Missing parameters → `ERROR: Must provide ID, name and start date.`
  // TODO: Implement logic
}

function deleteCourse(param) {
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
  const courses = loadCourseData();
  const courseToDelete = courses.find((course) => course.id === id);
  if (!courseToDelete) {
    console.error(`ERROR: Course with ID ${id} does not exist`);
    return false;
  }
  const updatedCourses = courses.filter((course) => course.id !== id);
  saveCourseData(updatedCourses);
  console.log(`DELETED: ${id} ${courseToDelete.name}`);
  return true;
  // Invalid ID → ERROR: Course with ID <ID> does not exist
  // TODO: Implement logic
}

function joinCourse(param) {
  if (param.length !== 2) {
    console.error('ERROR: Must provide course ID and trainee ID');
    return false;
  }
  let [courseID, traineeID] = param.map(Number);
  if (isNaN(courseID) || isNaN(traineeID)) {
    console.error('ERROR: course ID and trainee ID must be numbers');
    return false;
  }

  const courses = loadCourseData();
  const updatedCourse = courses.find((c) => c.id === courseID);
  if (!updatedCourse) {
    console.error(`ERROR: Course with ID ${courseID} does not exist`);
    return false;
  }

  const trainees = loadTraineeData();
  const trainee = trainees.find((t) => t.id === traineeID);
  if (!trainee) {
    console.error(`ERROR: Trainee with ID ${traineeID} does not exist`);
    return false;
  }

  if (updatedCourse.participants.includes(traineeID)) {
    console.error(`ERROR: The Trainee has already joined this course`);
    return false;
  }

  if (updatedCourse.participants.length >= 20) {
    console.error(`ERROR: The course is full`);
    return false;
  }

  if (
    courses.filter((course) => course.participants.includes(traineeID))
      .length >= 5
  ) {
    console.error(
      `ERROR: A trainee is not allowed to join more than 5 courses`
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
  //   - Missing parameters → `ERROR: Must provide course ID and trainee ID`
  // - Invalid course ID → `ERROR: Course with ID <ID> does not exist`
  // - Invalid trainee ID → `ERROR: Trainee with ID <ID> does not exist`
  // - Trainee has already joined the course → `ERROR: The Trainee has already joined this course`
  // - Course has reached maximum participants (20) → `ERROR: The course is full.`
  // - Trainee has reached maximum course enrolments (5) → `ERROR: A trainee is not allowed to join more than 5 courses.`
  // TODO: Implement logic
}

function leaveCourse() {
  // TODO: Implement logic
}

function getCourse() {
  // TODO: Implement logic
}

function getAllCourses() {
  // TODO: Implement logic
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
      console.error(`Unknown trainee subcommand: ${subcommand}`);
      return false;
  }
  // Read the subcommand and call the appropriate function with the arguments
}
