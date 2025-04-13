import React from 'react'

import clsx from 'clsx'
import { IButtonProps, SIZE, VARIANT } from './Button.types'

import styles from './styles.module.scss'

export const Button: React.FC<IButtonProps> = ({
  size = SIZE.MEDIUM,
  variant = VARIANT.PRIMARY,
  children,
  startIcon,
  endIcon,
  fullWidth = false,
  className,
  ...rest
}) => {
  const classNames = [
    styles[size],
    fullWidth && styles.full,
    styles[variant],
    styles.btn,
    className,
  ]
  return (
    <button className={clsx(classNames)} type='button' {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
