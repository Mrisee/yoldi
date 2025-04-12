export interface IImage {
  id: string
  url: string
  width: string
  height: string
}

export interface User {
  name: string
  email: string
  slug: string
  description: string
  image: IImage
  cover: IImage
}

export interface UserUpdate {
  name: string
  email: string
  slug: string
  description: string
  imageId: string
  coverId: string
}