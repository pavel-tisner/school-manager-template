import { describe, test, expect } from 'vitest';
import { joinCourse } from '../src/courseCommands.js';

describe('joinCourse', () => {
  test('returns false if params length is not 2', () => {
    const result = joinCourse([1]);

    expect(result).toBe(false);
  });

  test('returns false if IDs are not numbers', () => {
    const result = joinCourse(['abc', 'def']);

    expect(result).toBe(false);
  });

  test('returns false if course does not exist', () => {
    const result = joinCourse([999999, 1]);

    expect(result).toBe(false);
  });
});
