import { create } from 'zustand'
import { User } from '@/types/user'
import { api } from '@/lib/api'

interface UsersState {
	users: User[]
	selectedUser: User | null
	isLoading: boolean
	error: string | null
	fetchUsers: () => Promise<void>
	fetchUserBySlug: (slug: string) => Promise<void>
}

export const useUsersStore = create<UsersState>((set) => ({
	users: [],
	selectedUser: null,
	isLoading: false,
	error: null,

	fetchUsers: async () => {
		set({ isLoading: true, error: null })
		try {
			const data = await api<User[]>('/api/user')
			set({ users: data, isLoading: false })
		}
		catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Ошибка загрузки пользователей'
			set({ error: errorMessage, isLoading: false })
		}
	},

	fetchUserBySlug: async (slug: string) => {
		set({ isLoading: true, error: null })
		try {
			const data = await api<User>(`/api/user/${slug}`)
			set({ selectedUser: data, isLoading: false })
		}
		catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Ошибка загрузки профиля'
			set({ error: errorMessage, isLoading: false })
		}
	},
}))