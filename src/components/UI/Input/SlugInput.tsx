import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface ISlugInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const SlugInput = forwardRef<HTMLInputElement, ISlugInputProps>(
  ({ error, type, className, label, name, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={clsx(styles.slugWrapper, styles, className, {
            [styles.error]: error,
          })}
        >
          <div className={styles.slug}>example.com/</div>
          <input
            ref={ref}
            type={type}
            className={styles.input}
            name={name}
            {...rest}
          />
        </div>
      </div>
    )
  },
)

SlugInput.displayName = 'SlugInput'
