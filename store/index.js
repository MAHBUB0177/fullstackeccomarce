'use client'
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

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["search"],
};

const searchPersistConfig = {
  key: "search",
  storage,
};


const rootReducers = combineReducers({
  search: persistReducer(searchPersistConfig, searchReducer),
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ],
      },
    }),
  });

  // export type RootState = ReturnType<typeof rootReducers>;

export let persistor = persistStore(store);
// export let persitor = persistStore(store);
