'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/stores/auth'
import { Footer } from '@/components/Footer'
import { Button, SIZE } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { Envelope, Lock, User } from '@/assets/icons'
import styles from './styles.module.scss'

interface AuthFormData {
  name?: string
  email: string
  password: string
}

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [showPassword, setShowPassword] = useState(false)
  const { login, signup, isLoading } = useAuthStore()
  const [serverError, setServerError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>()

  const onSubmit = async (data: AuthFormData) => {
    setServerError('')

    try {
      if (mode === 'signup') {
        await signup(data.email, data.password, data.name)
      } else {
        await login(data.email, data.password)
      }

      router.push('/')
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка входа'
      setServerError(errorMessage)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
          <h1 className={styles.title}>
            {mode === 'signup' ? (
              <>
                Регистрация <br />
              </>
            ) : (
              'Вход'
            )}{' '}
            в Yoldi Agency
          </h1>

          <div className={styles.formInputs}>
            {mode === 'signup' && (
              <Input
                type='text'
                placeholder='Имя'
                icon={<User />}
                className={styles.input}
                error={errors.name?.message}
                {...register('name', {
                  required: 'Имя обязательно',
                  minLength: { value: 2, message: 'Минимум 2 символа' },
                })}
              />
            )}

            <Input
              type='email'
              placeholder='E-mail'
              icon={<Envelope />}
              className={styles.input}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Некорректный email',
                },
              })}
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Пароль'
              icon={<Lock />}
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
              className={styles.input}
              error={errors.password?.message}
              {...register('password', {
                required: 'Пароль обязателен',
              })}
            />
          </div>

          {serverError && <p className={styles.error}>{serverError}</p>}

          <Button
            fullWidth
            type='submit'
            disabled={isLoading}
            size={SIZE.MEDIUM}
          >
            {isLoading
              ? 'Загрузка...'
              : mode === 'signup'
                ? 'Создать аккаунт'
                : 'Войти'}
          </Button>
        </form>
      </div>

      <Footer mode={mode} setMode={setMode} />
    </>
  )
}
