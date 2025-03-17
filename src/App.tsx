import { useCallback, useEffect, useReducer } from 'react';

import './App.css';
import { TutorialDialog } from './components/tutorial/TutorialDialog.tsx';
import { Keyboard } from './components/keyboard/Keyboard.tsx';
import { Board } from './components/board/Board.tsx';

import {
  initialWordleState,
  WordleContext,
  WordleDispatchContext,
  wordleReducer,
} from './logic/state.ts';
import { KeyValue } from './logic/chars.ts';
import { handleKeyPress, validKeys } from './logic/input.ts';
import { ResultDialog } from './components/result/ResultDialog.tsx';

function App() {
  const [state, dispatch] = useReducer(wordleReducer, initialWordleState);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (state.gameStatus !== 'playing') {
        return;
      }
      if (validKeys.includes(e.key.toUpperCase())) {
        e.preventDefault();
        handleKeyPress(
          state.board,
          state.currentRow,
          e.key.toUpperCase() as KeyValue,
          state.targetWord,
          dispatch
        );
      }
    },
    [state.board, state.currentRow, state.gameStatus, state.targetWord]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  const { currentRow, board, targetWord } = state;

  return (
    <WordleContext value={state}>
      <WordleDispatchContext value={dispatch}>
        <div
          onKeyDown={(e) => console.log(e.key)}
          className="h-screen w-screen flex flex-col justify-between"
        >
          <header className="w-full bg-gray-300 text-center p-4">
            <h1 className="font-serif text-6xl font-bold">Wordle</h1>
          </header>

          <Board
            currentRow={currentRow}
            board={board}
            targetWord={targetWord}
          />
          <Keyboard />
          <TutorialDialog />
          <ResultDialog
            gameStatus={state.gameStatus}
            targetWord={state.targetWord}
          />
        </div>
      </WordleDispatchContext>
    </WordleContext>
  );
}

export default App;
