export type DataType = {
  id: number | null
  email: string | null
  login: string | null
}
export type UserType = {
  id: number
  name: string
  status: string | null
  followed: boolean
  photos: PhotosType
}
export type PhotosType = {
  small: null | string
  large: null | string
}
export type ContactType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  aboutMe: string
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactType
  photos: PhotosType
}
export type ProfileDataType = {
  userId: number
  lookingForAJob: boolean
  aboutMe: string
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactType
}
export type InferActionTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never
