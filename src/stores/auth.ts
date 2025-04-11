import { create } from 'zustand'
import { User } from '@/types/user'
import { api } from '@/lib/api'

interface AuthState {
  currentUser: User | null
	setUser: (user: User | null) => void
  token: string | null
  isLoading: boolean
  error: string | null
  setToken: (token: string) => void
  fetchProfile: (token: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, name: string, password: string) => Promise<void>
  logout: () => void
}

const fetchProfileData = async (token: string) => {
  try {
    const data = await api<User>('/api/profile', {
      headers: {
        'X-API-KEY': token,
      },
    })
    return data
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : 'Ошибка получения профиля'
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
	setUser: (user) => set({ currentUser: user }),
  token: null,
  setToken: (token) => set({ token }),
  isLoading: false,
  error: null,

  fetchProfile: async (token: string) => {
    set({ isLoading: true, error: null })
    try {
      const profile = await fetchProfileData(token)
      set({ currentUser: profile, isLoading: false })
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Ошибка получения профиля', isLoading: false })
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api<{ value: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      document.cookie = `auth=${response.value}`
      set({ token: response.value })

      const profile = await fetchProfileData(response.value)
      set({ currentUser: profile, isLoading: false })
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка входа'
      set({ error: errorMessage, isLoading: false })
    }
  },

  signup: async (email, name, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api<{ value: string }>('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      })

      document.cookie = `auth=${response.value}`
      set({ token: response.value })

      const profile = await fetchProfileData(response.value)
      set({ currentUser: profile, isLoading: false })
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка регистрации'
      set({ error: errorMessage, isLoading: false })
    }
  },

  logout: () => {
    set({ currentUser: null, token: null })
  },
}))
