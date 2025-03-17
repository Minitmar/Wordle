import { Cell } from './Cell.tsx';
import { BoardType } from '../../logic/game.ts';
import {
  checkGuess,
  GuessChar,
  stringToGuessArray,
} from '../../logic/guess.ts';

type props = {
  currentRow: number;
  board: BoardType;
  targetWord: string;
};

export function Board({ currentRow, board, targetWord }: props) {
  return (
    <div className="grid grid-rows-5 gap-2 w-fit max-w-full h-fit max-h-full mx-auto p-2">
      {board.map(({ guess, used }, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {checkGuesses(used, guess, targetWord).map((guess, index) => (
            <Cell
              inCurrentRow={rowIndex === currentRow}
              guess={guess}
              key={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function checkGuesses(
  rowUsed: boolean,
  guess: string,
  targetWord: string
): GuessChar[] {
  if (rowUsed) {
    return checkGuess(guess, targetWord);
  }
  return stringToGuessArray(guess);
}
