"use client" 

import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import store from './store'

interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
