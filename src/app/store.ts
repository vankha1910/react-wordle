import { configureStore } from '@reduxjs/toolkit';
import gameSlide from '../features/game/gameSlide';

const store = configureStore({
  reducer: {
    game: gameSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
