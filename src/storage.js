import fs from 'node:fs';
import chalk from 'chalk';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  try {
    if (!fs.existsSync(TRAINEE_DATA_FILE_PATH)) {
      throw new Error('Missing file');
    }
    const trainees = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');

    if (!trainees) {
      throw new Error('Trainees list cannot be empty');
    }

    return JSON.parse(trainees);
  } catch (error) {
    console.error(chalk.red(error.message));
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH, JSON.stringify([]));
    return [];
  }
}

export function saveTraineeData(trainees) {
  try {
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH, JSON.stringify(trainees, null, 2));
    return true;
  } catch (error) {
    console.error(chalk.red('Error saving trainees:', error.message));
    return false;
  }
}

export function loadCourseData() {
  try {
    if (!fs.existsSync(COURSE_DATA_FILE_PATH)) {
      throw new Error('Missing file');
    }
    const courses = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');

    if (!courses) {
      throw new Error('Courses list cannot be empty');
    }

    return JSON.parse(courses);
  } catch (error) {
    console.error(chalk.red(error.message));
    fs.writeFileSync(COURSE_DATA_FILE_PATH, JSON.stringify([]));
    return [];
  }
}

export function saveCourseData(courses) {
  try {
    fs.writeFileSync(COURSE_DATA_FILE_PATH, JSON.stringify(courses, null, 2));
    return true;
  } catch (error) {
    console.error(chalk.red('Error saving courses:', error.message));
    return false;
  }
}
