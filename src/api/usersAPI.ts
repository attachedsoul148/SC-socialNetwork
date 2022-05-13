import { FilterType } from "../components/Users/UserSearchForm"
import { UserType } from "../types/types"
import { APIResponseType, instance } from "./api"

type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  getUsers(pageSize: number, currentPage: number, filter: FilterType) {
    return instance.get<GetUsersResponseType>(
      `users?count=${pageSize}&page=${currentPage}&term=${filter.term}` +
        (filter.friend === null ? "" : `&friend=${filter.friend}`)
    )
  },
  setFollow(id: number) {
    return instance
      .post<APIResponseType>(`follow/${id}`)
      .then((res) => res.data)
  },
  setUnFollow(id: number) {
    return instance
      .delete<APIResponseType>(`follow/${id}`)
      .then((res) => res.data)
  },
}
