import React from 'react'
import styles from './styles.module.scss'
import { Button, SIZE, VARIANT } from '../UI/Button'
import { IImage } from '@/types/user'

interface ICoverProps {
  cover?: IImage
  isOwnProfile?: boolean
  onUpload?: () => void
}

export const Cover: React.FC<ICoverProps> = ({
  cover,
  isOwnProfile,
  onUpload,
}) => {
  const coverUrl = cover ? `url(${cover.url})` : ''

  return (
    <div className={styles.cover} style={{ backgroundImage: coverUrl || '' }}>
      {isOwnProfile && onUpload && (
        <Button
          className={styles.button}
          variant={VARIANT.SECONDARY}
          size={SIZE.SMALL}
          onClick={onUpload}
        >
          Загрузить
        </Button>
      )}
    </div>
  )
}
