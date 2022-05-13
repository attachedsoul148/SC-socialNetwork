import style from "./Users.module.css"
import React, { useEffect } from "react"
import User from "./SingleUser/User"
import Paginator from "../common/Paginator/Paginator"
import UserSearchForm, { FilterType } from "./UserSearchForm"
import { useDispatch, useSelector } from "react-redux"
import {
  getCurrentPageSelector,
  getFilterSelector,
  getFollowingInProgressSelector,
  getIsFetchingSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersSelector,
} from "../../redux/selectors/userSelectors"
import { followTC, getUsersTC, unFollowTC } from "../../redux/usersReducer"
import Preloader from "../common/Preloader/Preloader"
import { useLocation, useNavigate } from "react-router-dom"
type ParsedStringType = {
  term: string
  friend: "null" | "true" | "false"
  page: string
}

export const Users: React.FC = React.memo((props) => {
  const queryString = require("query-string")
  const location = useLocation()
  const navigator = useNavigate()
  const isFetching = useSelector(getIsFetchingSelector)
  const currentPage = useSelector(getCurrentPageSelector)
  const pageSize = useSelector(getPageSizeSelector)
  const filter = useSelector(getFilterSelector)
  const totalUsersCount = useSelector(getTotalUsersCountSelector)
  const users = useSelector(getUsersSelector)
  const followingInProgress = useSelector(getFollowingInProgressSelector)
  useEffect(() => {
    const parsed: ParsedStringType = queryString.parse(location.search)
    let actualPage = currentPage
    let actualFilter: FilterType = filter
    if (parsed.page) actualPage = Number(parsed.page)
    if (parsed.term)
      actualFilter = {
        ...actualFilter,
        term: parsed.term,
        friend:
          parsed.friend === "null"
            ? null
            : parsed.friend === "true"
            ? true
            : false,
      }
    dispatch(getUsersTC(pageSize, actualPage, actualFilter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    navigator(
      `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentPage])
  const dispatch = useDispatch()

  const updateUsers = (pageNumber: number) => {
    dispatch(getUsersTC(pageSize, pageNumber, filter))
  }
  const updateFilter = (filter: FilterType) => {
    dispatch(getUsersTC(pageSize, 1, filter))
  }
  const followThunk = (userId: number) => {
    dispatch(followTC(userId))
  }
  const unFollowThunk = (userId: number) => {
    dispatch(unFollowTC(userId))
  }

  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={style.usersContainer}>
          <div>
            <h2>Users</h2>
          </div>
          <UserSearchForm updateFilter={updateFilter} />
          <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            updateUsers={updateUsers}
          />
          <div className={style.usersInfo}>
            {users.map((u) => (
              <User
                followThunk={followThunk}
                unFollowThunk={unFollowThunk}
                followingInProgress={followingInProgress}
                user={u}
                key={u.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
})
