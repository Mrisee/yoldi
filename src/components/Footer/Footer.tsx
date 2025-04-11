import { Button, VARIANT } from '../UI/Button'
import styles from './styles.module.scss'

type FooterProps = {
  mode: 'login' | 'signup'
  setMode: (mode: 'login' | 'signup') => void
}

export const Footer = ({ mode, setMode }: FooterProps) => {
  const toggle = () => setMode(mode === 'signup' ? 'login' : 'signup')

  return (
    <div className={styles.footer}>
      <span className={styles.text}>
        {mode === 'signup' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
      </span>
      <Button type='button' onClick={toggle} variant={VARIANT.TEXT}>
        {mode === 'signup' ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </div>
  )
}
