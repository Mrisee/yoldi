'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'
import { Footer } from '@/components/Footer'
import { Button, SIZE } from '@/components/UI/Button'
import styles from './styles.module.scss'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, signup, isLoading, error } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'signup') {
      await signup(name, email, password)
    } else {
      await login(email, password)
    }

    router.push('/')
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.card}>
          <h1 className={styles.title}>
            {mode === 'signup' ? (
              <>
                Регистрация <br />{' '}
              </>
            ) : (
              'Вход'
            )}{' '}
            в Yoldi Agency
          </h1>

          {mode === 'signup' && (
            <input
              type='text'
              placeholder='Имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          )}

          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className={styles.togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
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
      <Footer mode={mode} setMode={setMode}></Footer>
    </>
  )
}
