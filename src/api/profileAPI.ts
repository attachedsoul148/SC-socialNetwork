import { PhotosType, ProfileDataType, ProfileType } from "../types/types"
import { APIResponseType, instance } from "./api"

type UpdateProfilePhotoDataType = { photos: PhotosType }

export const profileAPI = {
  getStatus(profileId: number) {
    return instance.get<string>(`profile/status/${profileId}`)
  },
  getProfile(profileId: number) {
    return instance.get<ProfileType>(`profile/${profileId}`)
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>("profile/status", { status })
  },
  updateProfilePhoto(file: File) {
    const formData = new FormData()
    formData.append("image", file)
    return instance.put<APIResponseType<UpdateProfilePhotoDataType>>(
      "/profile/photo",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  },
  updateProfileData(profileData: ProfileDataType) {
    return instance.put<APIResponseType>("/profile", profileData)
  },
}
