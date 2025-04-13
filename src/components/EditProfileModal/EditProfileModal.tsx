import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { User } from '@/types/user'
import { Input, Textarea } from '../UI/Input'
import { Button, VARIANT } from '../UI/Button'
import { SlugInput } from '../UI/Input/SlugInput'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'next/navigation'

interface IEditProfileModal {
  user: User
  onClose: () => void
}
export const EditProfileModal: React.FC<IEditProfileModal> = ({
  user,
  onClose,
}) => {
  const router = useRouter()
  const { updateProfile, isLoading, token } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      slug: user.slug,
      description: user.description || '',
    },
  })

  const onSubmit = async (data: {
    name: string
    slug: string
    description: string
  }) => {
    updateProfile(data, token!)
    router.push(`/${data.slug}`)
    onClose()
  }

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = originalOverflow
    }
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.title}>Редактировать профиль</div>
        <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Имя'
            {...register('name', { required: true })}
            error={errors.name?.message}
          />
          <SlugInput
            label='Адрес профиля'
            {...register('slug', { required: true })}
            error={errors.slug?.message}
          />
          <Textarea
            label='Описание'
            {...register('description')}
            error={errors.description?.message}
          />

          <div className={styles.buttons}>
            <Button
              onClick={onClose}
              fullWidth
              variant={VARIANT.SECONDARY}
              type='button'
            >
              Отмена
            </Button>
            <Button
              fullWidth
              variant={VARIANT.PRIMARY}
              type='submit'
              disabled={isLoading}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
