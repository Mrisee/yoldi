import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { AVARIANT, IAvatarProps } from './Avatar.types'
import styles from './styles.module.scss'
import { Button, VARIANT } from '../UI/Button'
import { Camera } from '@/assets/icons'

export const Avatar: React.FC<IAvatarProps> = ({
  img,
  name,
  variant = AVARIANT.NAVIGATION,
  onUpload,
}) => {
  const classNames = [styles[variant], styles.avatarWrapper]

  const handleClick = () => {
    if (onUpload) onUpload()
  }

  return (
    <div className={clsx(classNames)}>
      {img && img.url !== 'unknown' ? (
        <Image
          className={styles.avatar}
          src={img.url}
          alt='avatar'
          width={Number(img.width)}
          height={Number(img.width)}
          style={{ cursor: onUpload ? 'pointer' : 'default' }}
        />
      ) : (
        <div className={styles.avatar}>{name?.slice(0, 1)}</div>
      )}
      {onUpload && (
        <Button
          className={styles.button}
          onClick={handleClick}
          variant={VARIANT.TEXT}
          startIcon={<Camera />}
        ></Button>
      )}
    </div>
  )
}
