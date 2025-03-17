import { CharStatus, CharValue, KeyValue } from '../../logic/chars.ts';
import { Key } from './Key.tsx';
import { use } from 'react';
import { WordleContext } from '../../logic/state.ts';
import { getKeyStatuses } from '../../logic/guess.ts';
import { validKeys } from '../../logic/input.ts';

type Row = KeyValue[];

const Rows: Row[] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const Keyboard = () => {
  const state = use(WordleContext);

  const keyStatuses =
    state != null
      ? getKeyStatuses(state.board, state.targetWord)
      : (Object.fromEntries(
          validKeys.map((char) => [char, 'unused'] as [CharValue, CharStatus])
        ) as Record<KeyValue, CharStatus>);

  return (
    <div className="grid grid-rows-3 justify-center justify-items-center gap-2 w-fit max-w-full h-fit max-h-full mx-auto p-2">
      {Rows.map((row, index) => (
        <div key={index} className={`grid grid-flow-col gap-2`}>
          {row.map((key) => (
            <Key key={key} keyValue={key} status={keyStatuses[key]} />
          ))}
        </div>
      ))}
    </div>
  );
};
