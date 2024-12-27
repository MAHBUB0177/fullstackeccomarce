'use client'
import React from 'react'
import {persistor, store} from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

interface LayoutProviderProps {
    children: React.ReactNode;
  }
const LayoutProvider = ({children}:LayoutProviderProps) => {
  return (
    <div>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {children}
        </PersistGate>
        </Provider>
    </div>
  )
}

export default LayoutProvider