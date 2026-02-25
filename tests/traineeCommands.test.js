import { describe, test, expect } from 'vitest';
import { addTrainee, updateTrainee } from '../src/traineeCommands.js';

describe('addTrainee', () => {
  test('returns false if params length is not 2', () => {
    const result = addTrainee(['Pavel']);
    expect(result).toBe(false);
  });

  test('creates a new trainee object with correct fields', () => {
    const result = addTrainee(['Pavel', 'Tisner']);

    expect(result.firstName).toBe('Pavel');
    expect(result.lastName).toBe('Tisner');
  });
});

describe('updateTrainee', () => {
  test('returns false if id is not a number', () => {
    const result = updateTrainee(['2w3 Pavel Tizner']);

    expect(result).toBe(false);
  });
});
