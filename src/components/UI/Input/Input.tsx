import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { Eye } from '@/assets/icons'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  showPassword?: boolean
  setShowPassword?: () => void
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, showPassword, setShowPassword, error, type, className, ...rest },
    ref,
  ) => {
    return (
      <div
        className={clsx(styles.wrapper, className, { [styles.error]: error })}
      >
        {icon && <div className={styles.icon}>{icon}</div>}

        <input ref={ref} type={type} className={styles.input} {...rest} />
        {setShowPassword && (
          <div
            className={clsx(
              styles.showPassword,
              showPassword === true && styles.shown,
            )}
            onClick={setShowPassword}
          >
            <Eye />
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
