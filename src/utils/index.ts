import { GameState } from '../types/game.type';
import { GOOD_WORDS } from './validWords';
const KEY_STORAGE = 'react-wordle';

export function isValidChar(char: string) {
  return /^[a-zA-Z]$/.test(char);
}

export function isValidWord(word: string) {
  return GOOD_WORDS.includes(word);
}

export function saveData<T>(data: T) {
  localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
}

export function getData<T>(): T | null {
  const data = localStorage.getItem(KEY_STORAGE);

  return data ? (JSON.parse(data) as T) : null;
}

export function getGameData() {
  const data = getData<GameState>();
  return data;
}

export function getRandomWord() {
  return GOOD_WORDS[Math.floor(Math.random() * GOOD_WORDS.length)];
}
