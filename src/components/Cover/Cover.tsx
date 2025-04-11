import React from 'react'
import styles from './styles.module.scss'
import { Button, SIZE, VARIANT } from '../UI/Button'
import { IImage } from '@/types/user'

interface ICoverProps {
  cover: IImage
}

export const Cover: React.FC<ICoverProps> = ({ cover }) => {
  const coverUrl = cover ? `url(${cover.url})` : ''
  return (
    <div className={styles.cover} style={{ backgroundImage: coverUrl || '' }}>
      <Button
        className={styles.button}
        variant={VARIANT.SECONDARY}
        size={SIZE.SMALL}
      >
        Загрузить
      </Button>
    </div>
  )
}
