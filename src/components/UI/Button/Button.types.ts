import React from 'react'

export enum SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  WITH_ICON='withIcon'
}

export enum VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text'
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SIZE.SMALL | SIZE.MEDIUM | SIZE.WITH_ICON
  variant?: VARIANT
  children?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  fullWidth?: boolean
}
