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