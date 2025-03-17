import { CharStatus, CharValue, KeyValue } from './chars.ts';
import { BoardType } from './game.ts';
import { validKeys } from './input.ts';

export type GuessChar = {
  value: CharValue | '';
  status: CharStatus;
};

export function emptyGuess(): GuessChar {
  return { value: '', status: 'unused' };
}

export function emptyGuessArray(): GuessChar[] {
  return [emptyGuess(), emptyGuess(), emptyGuess(), emptyGuess(), emptyGuess()];
}

export function stringToGuessArray(guess: string): GuessChar[] {
  if (guess.length === 0) return emptyGuessArray();

  const guessAsArray: GuessChar[] = guess
    .split('')
    .map((char) => ({ value: char as CharValue, status: 'unused' }));

  if (guessAsArray.length === 5) return guessAsArray;

  return guessAsArray.concat(emptyGuessArray().slice(0, 5 - guess.length));
}

export function getKeyStatuses(
  board: BoardType,
  targetWord: string
): Record<KeyValue, CharStatus> {
  const usedRows = board.filter((row) => row.used);

  const charStatusRecord = Object.fromEntries(
    validKeys.map((char) => [char, 'unused'] as [CharValue, CharStatus])
  ) as Record<KeyValue, CharStatus>;

  if (usedRows.length === 0) {
    return charStatusRecord;
  }

  const usedChars = usedRows.flatMap((row) =>
    checkGuess(row.guess, targetWord)
  );
  usedChars.forEach(({ value, status }) => {
    if (value === '') return;
    if (status === 'correct') {
      charStatusRecord[value] = 'correct';
    }
    if (status === 'close' && charStatusRecord[value] !== 'correct') {
      charStatusRecord[value] = 'close';
    }
    if (status === 'incorrect' && charStatusRecord[value] == 'unused') {
      charStatusRecord[value] = 'incorrect';
    }
  });

  return charStatusRecord;
}

export function checkGuess(guess: string, targetWordStr: string): GuessChar[] {
  if (guess.length !== 5) {
    return emptyGuessArray();
  }
  const targetWord = targetWordStr.toUpperCase();

  const splitTarget = targetWord.split('');
  const splitGuess = guess.toUpperCase().split('');

  const usedChars = splitTarget.map(() => false);

  const statuses: CharStatus[] = Array.from<CharStatus>(Array(guess.length));

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitTarget[i]) {
      statuses[i] = 'correct';
      usedChars[i] = true;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitTarget.includes(letter)) {
      statuses[i] = 'incorrect';
      return;
    }

    const indexOfPresentChar = splitTarget.findIndex(
      (x, index) => x === letter && !usedChars[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = 'close';
      usedChars[indexOfPresentChar] = true;
    } else {
      statuses[i] = 'incorrect';
    }
  });

  return splitGuess.map((g, i) => ({
    value: g as CharValue,
    status: statuses[i],
  }));
}
