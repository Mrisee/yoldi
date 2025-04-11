import { IImage } from '@/types/user'

export enum AVARIANT {
  NAVIGATION = 'navigation',
  PROFILE = 'profile',
}

export interface IAvatarProps {
  img?: IImage | null
  name?: string
  variant?: AVARIANT
}