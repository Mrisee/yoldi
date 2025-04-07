'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

export default function UserProfilePage() {
  const { slug } = useParams()
  const { currentUser } = useAuthStore()
  const { selectedUser, fetchUserBySlug, isLoading, error } = useUsersStore()

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchUserBySlug(slug)
    }
  }, [slug, fetchUserBySlug])

  if (isLoading) return <p>Загрузка профиля...</p>
  if (error) return <p>Ошибка: {error}</p>
  if (!selectedUser) return <p>Профиль не найден</p>

  const isOwnProfile = currentUser?.slug === slug

  return (
    <div>
      <h1>{isOwnProfile ? 'Мой профиль' : `Профиль: ${selectedUser.name}`}</h1>
      <p>Email: {selectedUser.email}</p>
      <p>Описание: {selectedUser.description}</p>

      {isOwnProfile && <button>Редактировать профиль</button>}
    </div>
  )
}
