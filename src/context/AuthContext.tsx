'use client'

import { createContext, useContext, useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'
import { User } from '@/types/user'

interface AuthProviderProps {
  children: React.ReactNode
  initialUser: User | null
  initialToken: string | null
}

const AuthInitContext = createContext<{
  initialUser: User | null
  initialToken: string | null
}>({
  initialUser: null,
  initialToken: null,
})

export function AuthProvider({
  children,
  initialUser,
  initialToken,
}: AuthProviderProps) {
  return (
    <AuthInitContext.Provider value={{ initialUser, initialToken }}>
      <Initializer />
      {children}
    </AuthInitContext.Provider>
  )
}

function Initializer() {
  const { initialUser, initialToken } = useContext(AuthInitContext)
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    if (initialToken) setToken(initialToken)
    if (initialUser) setUser(initialUser)
  }, [initialToken, initialUser, setToken, setUser])

  return null
}
