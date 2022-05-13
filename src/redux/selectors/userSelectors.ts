import { GlobalStateType } from "../store"

export const getUsersSelector = (state: GlobalStateType) => {
  return state.usersPage.users
}
export const getPageSizeSelector = (state: GlobalStateType) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCountSelector = (state: GlobalStateType) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPageSelector = (state: GlobalStateType) => {
  return state.usersPage.currentPage
}
export const getIsFetchingSelector = (state: GlobalStateType) => {
  return state.usersPage.isFetching
}
export const getFollowingInProgressSelector = (state: GlobalStateType) => {
  return state.usersPage.followingInProgress
}
export const getFilterSelector = (state: GlobalStateType) => {
  return state.usersPage.filter
}
