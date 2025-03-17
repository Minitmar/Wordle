export type BoardType = [AnswerRow, AnswerRow, AnswerRow, AnswerRow, AnswerRow];

export type AnswerRow = {
  guess: string;
  used: boolean;
};

export function emptyRow(): AnswerRow {
  return {
    guess: '',
    used: false,
  };
}

export function emptyBoard(): BoardType {
  return [emptyRow(), emptyRow(), emptyRow(), emptyRow(), emptyRow()];
}
