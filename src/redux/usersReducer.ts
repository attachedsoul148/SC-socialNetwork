import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { ResultCodeEnum } from "../api/api"
import { usersAPI } from "../api/usersAPI"
import { FilterType } from "../components/Users/UserSearchForm"
import { InferActionTypes, UserType } from "../types/types"
import { GlobalStateType } from "./store"

const inintialState = {
  users: [] as Array<UserType>,
  currentPage: 1,
  totalUsersCount: 15,
  pageSize: 3,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of user's ids
  filter: {
    term: "",
    friend: null as null | boolean,
  },
}
export type InintialStateType = typeof inintialState

export const usersReducer = (
  state = inintialState,
  action: ActionsType
): InintialStateType => {
  switch (action.type) {
    case "proj/users/FOLLOW": {
      let stateCopy = {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            u.followed = true
          }
          return u
        }),
      }
      return stateCopy
    }
    case "proj/users/UNFOLLOW": {
      let stateCopy = {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            u.followed = false
          }
          return u
        }),
      }
      return stateCopy
    }
    case "proj/users/SETUSERS": {
      return { ...state, users: action.users }
    }
    case "proj/users/SETTOTALUSERSCOUNT": {
      return { ...state, totalUsersCount: action.totalUsersCount }
    }
    case "proj/users/SETCURRENTPAGE": {
      return { ...state, currentPage: action.pageNumber }
    }
    case "proj/users/TOGGLEISFETCHING": {
      return { ...state, isFetching: action.isFetching }
    }
    case "proj/users/TOGGLEFOLLOWINGINPROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.followingInProgressID]
          : state.followingInProgress.filter(
              (id) => id !== action.followingInProgressID
            ),
      }
    }
    case "proj/users/SETFILTER": {
      return { ...state, filter: action.filter }
    }
    default:
      return state
  }
}

export const usersActionCreators = {
  follow: (userID: number) =>
    ({
      type: "proj/users/FOLLOW",
      userID,
    } as const),
  unFollow: (userID: number) =>
    ({
      type: "proj/users/UNFOLLOW",
      userID,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "proj/users/SETUSERS",
      users,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "proj/users/SETTOTALUSERSCOUNT",
      totalUsersCount,
    } as const),
  setCurrentPage: (pageNumber: number) =>
    ({
      type: "proj/users/SETCURRENTPAGE",
      pageNumber,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "proj/users/TOGGLEISFETCHING",
      isFetching,
    } as const),
  toggleFollowingInProgress: (
    isFetching: boolean,
    followingInProgressID: number
  ) =>
    ({
      type: "proj/users/TOGGLEFOLLOWINGINPROGRESS",
      isFetching,
      followingInProgressID,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: "proj/users/SETFILTER",
      filter,
    } as const),
}

//thunk creators
export const getUsersTC = (
  pageSize: number,
  currentPage: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch) => {
    dispatch(usersActionCreators.toggleIsFetching(true))
    dispatch(usersActionCreators.setCurrentPage(currentPage))
    dispatch(usersActionCreators.setFilter(filter))
    let response = await usersAPI.getUsers(pageSize, currentPage, filter)
    dispatch(usersActionCreators.setUsers(response.data.items))
    dispatch(usersActionCreators.setTotalUsersCount(response.data.totalCount))
    dispatch(usersActionCreators.toggleIsFetching(false))
  }
}
const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  actionCreator: (userID: number) => ActionsType,
  apiMethod: any,
  id: number
) => {
  dispatch(usersActionCreators.toggleFollowingInProgress(true, id))
  let data = await apiMethod(id)
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(id))
  }
  dispatch(usersActionCreators.toggleFollowingInProgress(false, id))
}
export const followTC = (id: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(
      dispatch,
      usersActionCreators.follow,
      usersAPI.setFollow,
      id
    )
  }
}
export const unFollowTC = (id: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(
      dispatch,
      usersActionCreators.unFollow,
      usersAPI.setUnFollow,
      id
    )
  }
}

export default usersReducer

type ActionsType = ReturnType<InferActionTypes<typeof usersActionCreators>>
type ThunkType = ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionsType
>
