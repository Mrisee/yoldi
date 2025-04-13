import React from 'react'
import styles from './styles.module.scss'
import { Button, SIZE, VARIANT } from '../UI/Button'
import { IImage } from '@/types/user'
import { Picture, Trash, Upload } from '@/assets/icons'

interface ICoverProps {
  cover?: IImage | null
  isOwnProfile?: boolean
  onUpload?: () => void
  onRemove?: () => void
  isLoading: boolean
}

export const Cover: React.FC<ICoverProps> = ({
  cover,
  isOwnProfile,
  onUpload,
  onRemove,
  isLoading,
}) => {
  const coverUrl = cover ? `url(${cover.url})` : ''

  return (
    <div className={styles.cover} style={{ backgroundImage: coverUrl || '' }}>
      {isOwnProfile && !isLoading && (
        <div className={styles.buttons}>
          {onUpload && !cover && (
            <Button
              className={styles.button}
              variant={VARIANT.SECONDARY}
              size={SIZE.WITH_ICON}
              onClick={onUpload}
              startIcon={<Upload />}
              endIcon={<Picture />}
            >
              Загрузить
            </Button>
          )}
          {cover && onRemove && (
            <Button
              className={styles.button}
              variant={VARIANT.SECONDARY}
              size={SIZE.WITH_ICON}
              onClick={onRemove}
              startIcon={<Trash />}
              endIcon={<Picture />}
            >
              Удалить
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
