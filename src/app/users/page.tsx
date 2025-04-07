'use client'

import { useEffect } from 'react'
import { useUsersStore } from '@/stores/users'
import Link from 'next/link'

export default function UsersPage() {
  const { users, fetchUsers, isLoading, error } = useUsersStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <div>
      <h1>Пользователи</h1>
      <ul>
        {users.map((user) => (
          <li key={user.slug}>
            <Link href={`/users/${user.slug}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
