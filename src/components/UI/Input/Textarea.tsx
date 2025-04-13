import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div>
        {label && <label className={styles.label}>{label}</label>}
        <textarea
          ref={ref}
          className={clsx(styles.textarea, styles.wrapper)}
          {...rest}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
