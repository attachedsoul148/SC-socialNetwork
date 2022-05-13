import { GlobalStateType } from "../store"

export const getProfileSelector = (state: GlobalStateType) => {
  return state.profilePage.profile
}
export const getProfileIdSelector = (state: GlobalStateType) => {
  return state.profilePage.profileId
}
export const getIsAuthSelector = (state: GlobalStateType) => {
  return state.auth.isAuth
}
export const getStatusSelector = (state: GlobalStateType) => {
  return state.profilePage.status
}
export const getMyIdSelector = (state: GlobalStateType) => {
  return state.auth.id
}
export const getPostsDataSelector = (state: GlobalStateType) => {
  return state.profilePage.postsData
}
export const getNewPostTextSelector = (state: GlobalStateType) => {
  return state.profilePage.newPostText
}
