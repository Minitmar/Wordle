import { ActionDispatch, KeyboardEventHandler } from 'react';
import { KeyValue, validChars } from './chars.ts';
import { WordleAction } from './state.ts';
import { BoardType } from './game.ts';

export const keyHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }
  console.log(e.key);
};

export const validKeys: string[] = [...validChars, 'ENTER', 'BACKSPACE'];

export function handleKeyPress(
  board: BoardType,
  currentRowNumber: number,
  key: KeyValue,
  targetWord: string,
  dispatch: ActionDispatch<[action: WordleAction]>
) {
  const currentRow = board[currentRowNumber];
  if (currentRowNumber === 4 && currentRow.used) {
    return;
  }

  if (key === 'ENTER') {
    if (currentRow.guess.length != 5) {
      return;
    }
    const newBoardState = board;
    newBoardState[currentRowNumber].used = true;

    if (currentRow.guess === targetWord.toUpperCase()) {
      dispatch({
        action: 'submitAnswer',
        newBoard: newBoardState,
        nextRow: currentRowNumber,
        won: true,
      });
      return;
    }

    dispatch({
      action: 'submitAnswer',
      newBoard: newBoardState,
      nextRow: currentRowNumber < 4 ? currentRowNumber + 1 : currentRowNumber,
    });
    return;
  }

  if (key === 'BACKSPACE') {
    const newBoardState = board;
    const guess = currentRow.guess;
    newBoardState[currentRowNumber].guess =
      guess.length > 1 ? guess.slice(0, guess.length - 1) : '';

    dispatch({ action: 'updateAnswer', newBoard: newBoardState });
    return;
  }

  if (currentRow.guess.length === 5) {
    return;
  }

  const newBoardState = board;
  newBoardState[currentRowNumber].guess += key;
  dispatch({ action: 'updateAnswer', newBoard: newBoardState });
}
