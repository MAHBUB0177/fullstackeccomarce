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
import { authReducer } from "@/reducer";
import cartReducer from "@/reducer/cartReducer";
import confirmCartReducer from "@/reducer/confirmCartReducer";


// Root persist configuration without whitelisting 'search'
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ['auth', 'search'] // Only 'auth' state will be persisted
  // No need to whitelist 'search' since it's handled separately
};

const authPersistConfig = {
  key: "auth",
  storage,
};


// Specific persist configuration for 'search' using session storage
const searchPersistConfig = {
  key: "search",
  storage,  // Use session storage
};

const addtocartPersistConfig = {
  key: "cart",
  storage,  // Use session storage
};

const confirmOrderPersistConfig = {
  key: "confrimorderinfo",
  storage,  // Use session storage
};

const rootReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  search: persistReducer(searchPersistConfig, searchReducer), // Persist 'search' in session storage
  // other reducers if any...
  cart: persistReducer(addtocartPersistConfig, cartReducer),
  Orderinfo: persistReducer(confirmOrderPersistConfig, confirmCartReducer),
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
