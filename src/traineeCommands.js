import { saveTraineeData, loadTraineeData } from './storage.js';

function addTrainee(fullName) {
  if (fullName.length !== 2) {
    console.error('Must provide first and last name');
    return false;
  }
  const [firstName, lastName] = fullName;
  const trainees = loadTraineeData();
  const newTrainee = {
    id: Math.floor(Math.random() * 100000),
    firstName,
    lastName,
  };
  trainees.push(newTrainee);
  saveTraineeData(trainees);
  return newTrainee;
}

function updateTrainee() {
  // TODO: Implement the logic
}

function deleteTrainee() {
  // TODO: Implement the logic
}

function fetchTrainee() {
  // TODO: Implement the logic
}

function fetchAllTrainees() {
  // TODO: Implement the logic
}

export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
}
