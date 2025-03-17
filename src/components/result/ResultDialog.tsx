import { use, useEffect, useRef } from 'react';
import { WordleDispatchContext } from '../../logic/state.ts';
import { Cell } from '../board/Cell.tsx';
import { GuessChar } from '../../logic/guess.ts';
import { CharValue } from '../../logic/chars.ts';

type props = {
  gameStatus: 'won' | 'lost' | 'playing';
  targetWord: string;
};

export function ResultDialog({ gameStatus, targetWord }: props) {
  const dispatch = use(WordleDispatchContext);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handlePlayAgain = () => {
    dialogRef.current?.close();
    if (dispatch) dispatch({ action: 'resetBoard' });
  };

  useEffect(() => {
    if (gameStatus !== 'playing' && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [gameStatus]);

  const targetWordArray: GuessChar[] = targetWord
    .toUpperCase()
    .split('')
    .map((w) => ({ value: w as CharValue, status: 'correct' }));

  return (
    <dialog ref={dialogRef} className="w-full max-w-lg m-auto">
      <div className="relative p-15 text-left flex flex-col gap-10">
        <h2 className="text-6xl font-bold font-serif text-center">
          {gameStatus === 'won' ? 'You won!' : 'You lost!'}
        </h2>
        <div className="flex flex-col gap-3 text-center">
          <p>The word was:</p>
          <div className="grid mx-auto grid-cols-5 w-fit gap-1">
            {targetWordArray.map((guess, index) => (
              <Cell inCurrentRow={false} guess={guess} key={index} />
            ))}
          </div>
        </div>
        <button
          className={
            'border-2 mx-auto w-fit p-4 text-lg font-semibold text-white bg-blue-700 hover:bg-blue-500 rounded-sm'
          }
          type="button"
          onClick={handlePlayAgain}
        >
          Play again?
        </button>
      </div>
    </dialog>
  );
}
