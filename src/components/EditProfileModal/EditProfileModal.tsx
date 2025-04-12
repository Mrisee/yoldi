import React from 'react'
import styles from './styles.module.scss'
import { User } from '@/types/user'

interface IEditProfileModal {
  user: User
  onClose: () => void
}

export const EditProfileModal: React.FC<IEditProfileModal> = ({
  user,
  onClose,
}) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content}>EditProfileModal {user.name}</div>
    </div>
  )
}
