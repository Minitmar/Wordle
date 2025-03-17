import wordListTxt from '../assets/wordList.txt?raw';

function getWordList(): readonly string[] {
  return wordListTxt.split(',').map((word) => word.trim());
}

export function getRandomWord(): string {
  const wordList = getWordList();
  return wordList[Math.floor(Math.random() * wordList.length)];
}
