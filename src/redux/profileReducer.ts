import { ThunkAction } from "redux-thunk"
import { ResultCodeEnum } from "../api/api"
import { profileAPI } from "../api/profileAPI"
import {
  InferActionTypes,
  PhotosType,
  ProfileDataType,
  ProfileType,
} from "../types/types"
import { GlobalStateType } from "./store"

export type PostType = {
  id: number
  text: string
}
const initialState = {
  postsData: [
    { id: 1, text: "Hey guys! , that is my frist post" },
    { id: 2, text: "Hi guys! How are you today?" },
  ] as Array<PostType>,
  newPostText: "",
  profile: null as ProfileType | null,
  profileId: null as number | null,
  status: "",
}
type InitialStateType = typeof initialState

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "proj/prof/ADD_POST": {
      let stateCopy = { ...state }
      stateCopy.newPostText = action.postText
      let newPost = { id: 3, text: stateCopy.newPostText }
      stateCopy.postsData = [...state.postsData]
      stateCopy.postsData.push(newPost)
      stateCopy.newPostText = ""
      return stateCopy
    }
    case "proj/prof/SET_USER_PROFILE": {
      return { ...state, profile: action.profile }
    }
    case "proj/prof/GET_STATUS": {
      return { ...state, status: action.status }
    }
    case "proj/prof/SET_PHOTOS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    default:
      return state
  }
}

export const profileActionCreators = {
  addPostAC: (postText: string) =>
    ({ type: "proj/prof/ADD_POST", postText } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "proj/prof/SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "proj/prof/GET_STATUS",
      status,
    } as const),
  setProfilePhoto: (photos: PhotosType) =>
    ({ type: "proj/prof/SET_PHOTOS", photos } as const),
}

// thunk creators
export const getStatusTC = (profileId: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(profileId)
    dispatch(profileActionCreators.setStatus(response.data))
  }
}
export const setUserProfileTC = (profileId: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getProfile(profileId)
    dispatch(profileActionCreators.setUserProfile(response.data))
    dispatch(getStatusTC(profileId))
  }
}
export const updateStatusTC = (status: string): ThunkType => {
  return async (dispatch) => {
    await profileAPI.updateStatus(status)
    dispatch(profileActionCreators.setStatus(status))
  }
}
export const updateAvatarTC = (photoFile: any): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.updateProfilePhoto(photoFile)
    dispatch(profileActionCreators.setProfilePhoto(response.data.data.photos))
  }
}
export const updateProfileDataTC = (
  profileData: ProfileDataType
): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.updateProfileData(profileData)
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(setUserProfileTC(profileData.userId))
    }
  }
}
export default profileReducer

type ActionsType = ReturnType<InferActionTypes<typeof profileActionCreators>>
type ThunkType = ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionsType
>
