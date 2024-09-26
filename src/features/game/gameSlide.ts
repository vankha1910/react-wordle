import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../../types/game.type';
import { getGameData, getRandomWord, isValidWord, saveData } from '../../utils';
const randomWord = getRandomWord();
const initialState: GameState = {
  // prettier-ignore
  // rows: [
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  //   [{ char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }, { char: '', status: 'empty' }],
  // ],
  rows: Array.from({ length: 6 }, () => [
    { char: randomWord[0], status: 'correct' },
    // { char: '', status: 'empty' },
    { char: '', status: 'empty' },
    { char: '', status: 'empty' },
    { char: '', status: 'empty' },
    { char: '', status: 'empty' },
  ]),
  rowStates: Array.from({ length: 6 }, () => 'empty'),
  currentRowIndex: 0,
  secretWord: randomWord,
  gameStatus: 'pending',
  gameStats: {
    currentStreak: 0,
    maxStreak: 0,
    played: 0,
    win: 0,
  },
  errorMessage: '',
};

const gameSlide = createSlice({
  name: 'game',
  initialState: getGameData() || initialState,
  reducers: {
    addChar: (state, action) => {
      const char = action.payload;
      const currentRow = state.rows[state.currentRowIndex];
      const isRowFull = currentRow.every((cell) => cell.char !== '');

      if (isRowFull) {
        return;
      }

      const index = currentRow.findIndex((cell) => cell.char == '');

      if (index != -1) {
        currentRow[index].char = char;
        currentRow[index].status = 'filled';
      }
    },
    removeChar: (state) => {
      const currentRow = state.rows[state.currentRowIndex];
      const index = currentRow
        .slice()
        .reverse()
        .findIndex((cell) => cell.char !== '');
      if (index === -1) {
        return;
      }
      const actualIndex = currentRow.length - 1 - index;
      currentRow[actualIndex].char = '';
      currentRow[actualIndex].status = 'empty';
    },
    checkRow: (state) => {
      if (state.gameStatus === 'won' || state.gameStatus === 'lost') return;
      const currentRow = state.rows[state.currentRowIndex];
      const secretWordArray = state.secretWord.split('');
      const usedChars = Array(secretWordArray.length).fill(false);

      if (currentRow.some((cell) => cell.char === '')) {
        state.errorMessage = 'Not enough letters';
        return;
      }

      const userWord = currentRow
        .map((item) => item.char)
        .join('')
        .toLowerCase();
      if (!isValidWord(userWord)) {
        state.errorMessage = 'Not a valid word';
        return;
      }

      // check if row is correct
      currentRow.forEach((cell, index) => {
        if (cell.char === secretWordArray[index]) {
          cell.status = 'correct';
          usedChars[index] = true;
        }
      });

      currentRow.forEach((cell) => {
        if (cell.status !== 'correct') {
          const foundIndex = secretWordArray.findIndex(
            (char, index) => char === cell.char && usedChars[index] === false
          );
          if (foundIndex !== -1) {
            cell.status = 'present';
            usedChars[foundIndex] = true;
          } else {
            cell.status = 'absent';
          }
        }
      });

      // Final check
      if (currentRow.every((cell) => cell.status === 'correct')) {
        state.gameStatus = 'won';
        state.rowStates[state.currentRowIndex] = 'correct';
        state.gameStats.currentStreak += 1;
        state.gameStats.played += 1;
        state.gameStats.win += 1;
        if (state.gameStats.currentStreak > state.gameStats.maxStreak) {
          state.gameStats.maxStreak = state.gameStats.currentStreak;
        }
        saveData(state);
      } else if (state.currentRowIndex === 5) {
        state.gameStats.played += 1;
        state.gameStatus = 'lost';
        saveData(state);
      } else {
        state.rowStates[state.currentRowIndex] = 'revealed';
        state.currentRowIndex += 1;
        saveData(state);
      }
    },
    playNext: (state) => {
      state.currentRowIndex = 0;
      state.rowStates = Array.from({ length: 6 }, () => 'empty');
      state.gameStatus = 'inProgress';
      state.secretWord = getRandomWord();
      // console.log(state.secretWord);

      state.rows = Array.from({ length: 6 }, () => [
        { char: state.secretWord[0], status: 'correct' },
        // { char: '', status: 'empty' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
      ]);

      saveData(state);
    },
    playAgain: (state) => {
      state.currentRowIndex = 0;
      state.rowStates = Array.from({ length: 6 }, () => 'empty');
      state.gameStatus = 'inProgress';
      state.secretWord = getRandomWord();
      console.log(state.secretWord);
      state.rows = Array.from({ length: 6 }, () => [
        { char: state.secretWord[0], status: 'correct' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
        { char: '', status: 'empty' },
      ]);
      state.gameStats.currentStreak = 0;

      saveData(state);
    },
    clearErrorMessage: (state) => {
      state.errorMessage = '';
    },
  },
});

export const {
  addChar,
  removeChar,
  checkRow,
  clearErrorMessage,
  playNext,
  playAgain,
} = gameSlide.actions;

export default gameSlide.reducer;
