import { useRef } from 'react';

import './App.css';
import { TutorialDialog } from './components/TutorialDialog.tsx';
import { Keyboard } from './components/keyboard/Keyboard.tsx';

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <header className="w-full bg-gray-300 text-center p-4">
        <h1 className="font-serif text-6xl font-bold">Wordle</h1>
      </header>
      <div>
        <Keyboard />
      </div>
      <TutorialDialog ref={dialogRef} />
    </div>
  );
}

export default App;
