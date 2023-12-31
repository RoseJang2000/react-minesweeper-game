import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './modules/game';

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
