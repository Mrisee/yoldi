import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { Eye } from '@/assets/icons'
import clsx from 'clsx'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  showPassword?: boolean
  setShowPassword?: () => void
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      icon,
      showPassword,
      setShowPassword,
      error,
      type,
      className,
      label,
      name,
      ...rest
    },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={clsx(styles.wrapper, className, { [styles.error]: error })}
        >
          {icon && <div className={styles.icon}>{icon}</div>}

          <input
            ref={ref}
            type={type}
            className={styles.input}
            name={name}
            {...rest}
          />
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
      </div>
    )
  },
)

Input.displayName = 'Input'
