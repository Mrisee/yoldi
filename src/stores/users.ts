import { create } from 'zustand'
import { User } from '@/types/user'
import { api } from '@/lib/api'

const USERS_PER_PAGE = 10

interface UsersState {
  users: User[]
  selectedUser: User | null
  isLoading: boolean
  error: string | null
  page: number
  paginatedUsers: User[]
  hasMore: boolean
  fetchUsers: () => Promise<void>
  loadMoreUsers: () => void
  fetchUserBySlug: (slug: string) => Promise<void>
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  paginatedUsers: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await api<User[]>('/api/user')
      const firstPage = data.slice(0, USERS_PER_PAGE)
      set({
        users: data,
        paginatedUsers: firstPage,
        page: 1,
        hasMore: data.length > USERS_PER_PAGE,
        isLoading: false,
      })
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка загрузки пользователей'
      set({ error: errorMessage, isLoading: false })
    }
  },

  loadMoreUsers: () => {
    const { users, page, paginatedUsers } = get()
    const nextPage = page + 1
    const start = (nextPage - 1) * USERS_PER_PAGE
    const end = start + USERS_PER_PAGE
    const nextUsers = users.slice(start, end)

    set({
      paginatedUsers: [...paginatedUsers, ...nextUsers],
      page: nextPage,
      hasMore: end < users.length,
    })
  },

  fetchUserBySlug: async (slug: string) => {
    set({ isLoading: true, selectedUser: null, error: null })
    try {
      const user = await api<User>(`/api/user/${slug}`)
      set({ selectedUser: user, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Ошибка загрузки пользователя',
        isLoading: false,
      })
    }
  },
}))
