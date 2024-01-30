import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'store/user/userData.api';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
