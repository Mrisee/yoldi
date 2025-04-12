import React from 'react'
import Image from 'next/image'
import { filterStyles } from '@/lib/filterStyles'
import { AVARIANT, IAvatarProps } from './Avatar.types'
import styles from './styles.module.scss'

export const Avatar: React.FC<IAvatarProps> = ({
  img,
  name,
  variant = AVARIANT.NAVIGATION,
  onUpload,
}) => {
  const classNames = [styles[variant], styles.avatar]

  const handleClick = () => {
    if (onUpload) onUpload()
  }

  return img && img.url !== 'unknown' ? (
    <Image
      className={filterStyles(classNames)}
      src={img.url}
      alt='avatar'
      width={Number(img.width)}
      height={Number(img.width)}
      onClick={handleClick}
      style={{ cursor: onUpload ? 'pointer' : 'default' }}
    />
  ) : (
    <div className={filterStyles(classNames)} onClick={handleClick}>
      {name?.slice(0, 1)}
    </div>
  )
}
