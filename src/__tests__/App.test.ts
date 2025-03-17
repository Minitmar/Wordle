import { describe, expect, test } from 'vitest';
import { checkGuess } from '../logic/guess.ts';

describe('Wordle', () => {
  test('Guess response is given properly', () => {
    const validatedGuess = checkGuess('heard', 'horse');
    expect(validatedGuess[0].status).toBe('correct');
    expect(validatedGuess[1].status).toBe('close');
    expect(validatedGuess[2].status).toBe('incorrect');
    expect(validatedGuess[3].status).toBe('close');
    expect(validatedGuess[4].status).toBe('incorrect');
  });
  test(
    'Character in guess is not marked as close if more of that character in guess than answer, ' +
      'and the guess has one of that char in the correct position ',
    () => {
      const validatedGuess = checkGuess('otter', 'water');
      expect(validatedGuess[0].status).toBe('incorrect');
      expect(validatedGuess[1].status).toBe('incorrect');
      expect(validatedGuess[2].status).toBe('correct');
      expect(validatedGuess[3].status).toBe('correct');
      expect(validatedGuess[4].status).toBe('correct');
    }
  );
});
