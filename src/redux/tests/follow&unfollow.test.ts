import { FilterType } from "../../components/Users/UserSearchForm"
import usersReducer, {
  InintialStateType,
  usersActionCreators,
} from "../usersReducer"

let state: InintialStateType
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Pasha",
        status: "Alive",
        followed: false,
        photos: { small: null, large: null },
      },
      {
        id: 1,
        name: "Pasha1",
        status: "Alive",
        followed: true,
        photos: { small: null, large: null },
      },
    ],
    currentPage: 1,
    totalUsersCount: 15,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [], //array of user's ids
    filter: {} as FilterType,
  }
})

test("followed must be changed", () => {
  usersReducer(state, usersActionCreators.follow(0))
  expect(state.users[0].followed).toBeTruthy()
})
