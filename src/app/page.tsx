'use client'

import { useEffect } from 'react'
import { useUsersStore } from '@/stores/users'
import styles from './styles.module.scss'
import { ProfileLink } from '@/components/ProfileLink'

export default function UsersPage() {
  const { users, fetchUsers, error } = useUsersStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (error) return <p>Ошибка: {error}</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.profiles}>
          <h1 className={styles.heading}>Список аккаунтов</h1>
          <div>
            {users.map((user) => (
              <ProfileLink
                img={user.image}
                name={user.name}
                mail={user.email}
                key={user.slug}
                slug={user.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
