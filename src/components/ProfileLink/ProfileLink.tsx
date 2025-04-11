import React from 'react'
import styles from './styles.module.scss'
import { Avatar } from '../Avatar'
import { IImage } from '@/types/user'
import Link from 'next/link'

interface IProfileLink {
  img: IImage
  name: string
  mail: string
  slug: string
}

export const ProfileLink: React.FC<IProfileLink> = ({
  img,
  name,
  mail,
  slug,
}) => {
  return (
    <Link href={slug} className={styles.profile}>
      <div>
        <div className={styles.info}>
          <Avatar img={img} name={name} />
          <div>{name}</div>
        </div>
      </div>
      <div className={styles.mail}>{mail}</div>
    </Link>
  )
}
