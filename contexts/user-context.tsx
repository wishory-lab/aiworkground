'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  isLoaded: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    email: 'demo@workflowai.dev',
    name: 'Demo User',
    avatar: ''
  })
  const [isLoading] = useState(false)
  const [isLoaded] = useState(true)

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, isLoaded }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}