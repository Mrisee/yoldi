import React from 'react'
import Image from 'next/image'
import { filterStyles } from '@/lib/filterStyles'
import { AVARIANT, IAvatarProps } from './Avatar.types'
import styles from './styles.module.scss'

export const Avatar: React.FC<IAvatarProps> = ({
  img,
  name,
  variant = AVARIANT.NAVIGATION,
}) => {
  const classNames = [styles[variant], styles.avatar]

  return (
    <>
      {img && img.url !== 'unknown' ? (
        <Image
          className={filterStyles(classNames)}
          src={`${img.url}`}
          alt='avatar'
          width={Number(img.width)}
          height={Number(img.width)}
        />
      ) : (
        <div className={filterStyles(classNames)}>{name?.slice(0, 1)}</div>
      )}
    </>
  )
}
