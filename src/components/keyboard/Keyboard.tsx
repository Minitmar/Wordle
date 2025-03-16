import { KeyValue } from '../../logic/status.ts';
import { Key } from './Key.tsx';

type Row = { keys: KeyValue[]; columns: number };

const Rows: Row[] = [
  { keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], columns: 10 },
  { keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], columns: 9 },
  {
    keys: ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
    columns: 11,
  },
];

export const Keyboard = () => {
  return (
    <div className="grid grid-rows-3 justify-center justify-items-center gap-10 max-h-44 max-w-lg mx-auto">
      {Rows.map(({ keys, columns }) => (
        <div key={columns} className={`grid grid-cols-${columns} gap-2`}>
          {keys.map((key) => (
            <Key
              key={key}
              keyValue={key}
              status="empty"
              onClick={(_) => void 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
