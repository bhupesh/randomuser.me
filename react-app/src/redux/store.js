import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { randomuserApi } from '../services/randomuser';

export const store = configureStore({
  reducer: {
    [randomuserApi.reducerPath]: randomuserApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(randomuserApi.middleware),
});

setupListeners(store.dispatch);