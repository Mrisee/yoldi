'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { Cover } from '@/components/Cover'
import { Avatar, AVARIANT } from '@/components/Avatar'
import { Button, SIZE, VARIANT } from '@/components/UI/Button'
import styles from './styles.module.scss'

export default function UserProfilePage() {
  const { slug } = useParams()
  const currentUser = useAuthStore((state) => state.currentUser)
  const { selectedUser, fetchUserBySlug, error } = useUsersStore()

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchUserBySlug(slug)
    }
  }, [slug, fetchUserBySlug])

  if (error) return <p>Ошибка: {error}</p>
  if (!selectedUser) return <p>Профиль не найден</p>

  const isOwnProfile = currentUser?.slug === slug

  return (
    <div className={styles.wrapper}>
      <Cover cover={selectedUser.cover} />
      <div className={styles.container}>
        <Avatar
          variant={AVARIANT.PROFILE}
          name={selectedUser.name}
          img={selectedUser.image}
        />
        <div className={styles.info}>
          <div>
            <p className={styles.name}>{selectedUser.name}</p>
            <p className={styles.mail}>{selectedUser.email}</p>
          </div>
          {isOwnProfile && (
            <Button variant={VARIANT.SECONDARY} size={SIZE.SMALL}>
              Редактировать
            </Button>
          )}
        </div>
        <div className={styles.description}>{selectedUser.description}</div>

        {isOwnProfile && (
          <Button variant={VARIANT.SECONDARY} size={SIZE.SMALL}>
            Выйти
          </Button>
        )}
      </div>
    </div>
  )
}
