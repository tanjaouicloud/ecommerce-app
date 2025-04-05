"use client" // Add this line

import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import store from './store'

interface ReduxProviderProps {
  children: ReactNode // Define children as ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
