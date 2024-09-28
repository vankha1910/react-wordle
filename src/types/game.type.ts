export type CellType = {
  char: string;
  status: 'empty' | 'correct' | 'present' | 'absent' | 'filled';
};

export type Row = CellType[];

export type GameStatus = 'pending' | 'inProgress' | 'won' | 'lost';

export type GameStats = {
  currentStreak: number;
  maxStreak: number;
  played: number;
  win: number;
};

export type GameSettings = {
  darkMode: boolean;
  hardMode: boolean;
  showWelcomeScreen: boolean;
};

export type RowState = 'empty' | 'revealed' | 'correct';

export type GameState = {
  rows: Row[]; // Mảng các hàng
  rowStates: RowState[];
  currentRowIndex: number; // Chỉ số hàng hiện tại
  secretWord: string; // Từ bí mật
  gameStatus: GameStatus; // Trạng thái trò chơi
  gameStats: GameStats; // Thống kê trò chơi
  errorMessage: string;
  gameSettings: GameSettings;
};
