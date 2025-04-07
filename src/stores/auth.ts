import { create } from 'zustand'
import { User } from '@/types/user'
import { api } from '@/lib/api'

interface AuthState {
	currentUser: User | null
	isLoading: boolean
	error: string | null
	fetchProfile: () => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
	currentUser: null,
	isLoading: false,
	error: null,

	fetchProfile: async () => {
		set({ isLoading: true, error: null })
		try {
			const data = await api<User>('/api/profile')
			set({ currentUser: data, isLoading: false })
		}
		catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Ошибка получения профиля'
			set({ error: errorMessage, isLoading: false })
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null })
		try {
			await api('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			})
			const profile = await api<User>('/api/profile')
			set({ currentUser: profile, isLoading: false })
		} 
		catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Ошибка входа'
			set({ error: errorMessage, isLoading: false })
		}
	},

	logout: () => {
		set({ currentUser: null })
	},
}))