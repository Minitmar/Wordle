import { CharStatus, KeyValue } from '../../logic/chars.ts';
import { MdBackspace } from 'react-icons/md';
import { use } from 'react';
import { WordleContext, WordleDispatchContext } from '../../logic/state.ts';
import { handleKeyPress } from '../../logic/input.ts';
import classNames from 'classnames';

export type props = {
  keyValue: KeyValue;
  status: CharStatus;
};

export function Key({ keyValue, status }: props) {
  const dispatch = use(WordleDispatchContext);
  const state = use(WordleContext);
  const width =
    keyValue === 'ENTER' || keyValue === 'BACKSPACE' ? 'w-20' : 'w-10';

  const classname = classNames(
    'max-w-full h-14 max-h-full flex justify-center items-center font-mono text-2xl font-black rounded-sm cursor-pointer',
    width,
    {
      'bg-green-600': status === 'correct',
      'bg-yellow-400': status === 'close',
      'bg-gray-100': status === 'incorrect',
      'bg-gray-300': status === 'unused',
    }
  );

  return (
    <div
      onClick={() =>
        state != null && dispatch != null
          ? handleKeyPress(
              state.board,
              state.currentRow,
              keyValue,
              state.targetWord,
              dispatch
            )
          : void 0
      }
      className={classname}
    >
      {keyValue == 'BACKSPACE' ? (
        <MdBackspace className="m-auto" fontSize="1.5em" />
      ) : (
        keyValue
      )}
    </div>
  );
}
