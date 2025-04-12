'use client'

import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/Logo.svg'
import { Button, SIZE, VARIANT } from '../UI/Button'
import styles from './styles.module.scss'
import { useAuthStore } from '@/stores/auth'
import Link from 'next/link'
import { Avatar } from '../Avatar'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()

  const currentUser = useAuthStore((state) => state.currentUser)
  const token = useAuthStore((state) => state.token)

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.info}>
        <Image src={Logo} alt='' />
        <p className={styles.text}>
          Разрабатываем и запускаем <br /> сложные веб проекты
        </p>
      </Link>
      <div>
        {token ? (
          <Link href={`/${currentUser?.slug}`} className={styles.profile}>
            <div>{currentUser?.name}</div>
            <Avatar img={currentUser?.image} name={currentUser?.name} />
          </Link>
        ) : (
          <Button
            size={SIZE.SMALL}
            variant={VARIANT.SECONDARY}
            onClick={() => {
              router.push('/auth')
            }}
          >
            Войти
          </Button>
        )}
      </div>
    </header>
  )
}
