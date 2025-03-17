import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';

export function TutorialDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialogRef.current?.showModal();
  }, [dialogRef]);

  return (
    <dialog className="w-full max-w-lg m-auto" ref={dialogRef}>
      <div className="relative p-15 text-left flex flex-col gap-6">
        <button
          type="button"
          className="absolute right-0 top-0 w-fit h-fit bg-transparent p-2"
          onClick={() => dialogRef.current?.close()}
        >
          <MdClose title="Close dialog" fontSize="2.5rem" />
        </button>
        <div className="pb-3">
          <h2 className="text-3xl font-bold font-serif">How To Play</h2>
          <h3 className="text-xl font-serif">Guess the Wordle in 6 tries.</h3>
        </div>
        <ul className="list-disc list-inside">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <div>
          <h3 className="text-xl font-serif">Examples</h3>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold text-green-600">Green</span> means
              the letter is in the word and in the correct position.
            </li>
            <li>
              <span className="font-semibold text-yellow-400">Yellow</span>{' '}
              means the letter is in the word but in the wrong position.
            </li>
            <li>
              <span className="font-semibold text-gray-400">Gray</span> means
              the letter is not in the word.
            </li>
          </ul>
        </div>
      </div>
    </dialog>
  );
}
