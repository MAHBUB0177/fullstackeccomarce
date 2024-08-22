'use client';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import searchReducer from "@/reducer/searchReducer";

// Root persist configuration without whitelisting 'search'
const persistConfig = {
  key: "root",
  storage: storage,
  // No need to whitelist 'search' since it's handled separately
};

// Specific persist configuration for 'search' using session storage
const searchPersistConfig = {
  key: "search",
  storage: storageSession,  // Use session storage
};

const rootReducers = combineReducers({
  search: persistReducer(searchPersistConfig, searchReducer), // Persist 'search' in session storage
  // other reducers if any...
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducers>;

export let persistor = persistStore(store);
