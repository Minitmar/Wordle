import classNames from 'classnames';
import { GuessChar } from '../../logic/guess.ts';

type props = {
  guess: GuessChar;
  inCurrentRow: boolean;
};

export function Cell({ guess, inCurrentRow }: props) {
  const className = classNames(
    'text-4xl font-bold w-14 h-14 box-border flex justify-center items-center',
    {
      'bg-gray-400': guess.status === 'incorrect',
      'bg-green-600': guess.status === 'correct',
      'bg-yellow-400': guess.status === 'close',
      'text-white': guess.status !== 'unused',
    },
    {
      'border border-gray-500': !inCurrentRow && guess.status === 'unused',
      'border-2': inCurrentRow && guess.status === 'unused',
    }
  );

  return <div className={className}>{guess.value}</div>;
}
