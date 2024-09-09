import { GameState } from '../types/game.type';
import { VALID_WORDS } from './validWords';
const KEY_STORAGE = 'react-wordle';

export function isValidChar(char: string) {
  return /^[a-zA-Z]$/.test(char);
}

export function isValidWord(word: string) {
  return VALID_WORDS.includes(word);
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
  return VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];
}
