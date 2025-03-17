import { BoardType, emptyBoard } from './game.ts';
import { getRandomWord } from './words.ts';
import { ActionDispatch, createContext } from 'react';

export const WordleContext = createContext<WordleState | null>(null);
export const WordleDispatchContext = createContext<ActionDispatch<
  [action: WordleAction]
> | null>(null);

export type WordleState = {
  board: BoardType;
  currentRow: number;
  targetWord: string;
  gameStatus: 'won' | 'lost' | 'playing';
};

export type WordleAction =
  | {
      action: 'submitAnswer';
      newBoard: BoardType;
      nextRow: number;
      won?: boolean;
    }
  | { action: 'updateAnswer'; newBoard: BoardType }
  | { action: 'resetBoard' };

export const initialWordleState: WordleState = getInitialWordleState();

export function wordleReducer(
  state: WordleState,
  action: WordleAction
): WordleState {
  switch (action.action) {
    case 'submitAnswer':
      if (action.won) {
        return {
          ...state,
          board: action.newBoard,
          gameStatus: 'won',
        };
      }
      if (state.currentRow === 4) {
        return {
          ...state,
          board: action.newBoard,
          currentRow: action.nextRow,
          gameStatus: 'lost',
        };
      }

      return {
        ...state,
        board: action.newBoard,
        currentRow: action.nextRow,
      };
    case 'updateAnswer':
      return { ...state, board: action.newBoard };
    case 'resetBoard':
      return getInitialWordleState();
  }
}

export function getInitialWordleState(): WordleState {
  return {
    board: emptyBoard(),
    currentRow: 0,
    targetWord: getRandomWord(),
    gameStatus: 'playing',
  };
}
