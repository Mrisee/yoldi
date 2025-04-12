'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useUsersStore } from '@/stores/users'
import styles from './styles.module.scss'
import { ProfileLink } from '@/components/ProfileLink'

export default function UsersPage() {
  const {
    paginatedUsers,
    fetchUsers,
    loadMoreUsers,
    error,
    isLoading,
    hasMore,
  } = useUsersStore()

  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastUserRef = useRef<HTMLLIElement | null>(null)

  const lastUserElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreUsers()
        }
      })

      if (node) observerRef.current.observe(node)
      lastUserRef.current = node
    },
    [isLoading, hasMore, loadMoreUsers],
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (error) return <p>Ошибка: {error}</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.profiles}>
          <h1 className={styles.heading}>Список аккаунтов</h1>
          <ul className={styles.list}>
            {paginatedUsers.map((user, index) => {
              const isLast = index === paginatedUsers.length - 1
              return (
                <li key={user.slug} ref={isLast ? lastUserElementRef : null}>
                  <ProfileLink
                    img={user.image}
                    name={user.name}
                    mail={user.email}
                    slug={user.slug}
                  />
                </li>
              )
            })}
          </ul>
          {isLoading && <p>Загрузка...</p>}
        </div>
      </div>
    </div>
  )
}
