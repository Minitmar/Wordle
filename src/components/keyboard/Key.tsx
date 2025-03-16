import { CharStatus, KeyValue } from '../../logic/status.ts';
import { MdBackspace } from 'react-icons/md';

export type props = {
  keyValue: KeyValue;
  status: CharStatus;
  onClick: (value: KeyValue) => void;
};

export function Key({ keyValue, status, onClick }: props) {
  const width =
    keyValue === 'ENTER' || keyValue === 'BACKSPACE'
      ? 'col-span-2'
      : 'col-span-1';

  return (
    <div
      className={`font-mono text-2xl bg-gray-300 ${width} flex items-center justify-center rounded-md cursor-pointer p-4`}
    >
      {keyValue == 'BACKSPACE' ? (
        <MdBackspace className="" fontSize="1.5em" />
      ) : (
        keyValue
      )}
    </div>
  );
}
