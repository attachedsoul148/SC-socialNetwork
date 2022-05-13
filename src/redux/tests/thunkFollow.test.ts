import { APIResponseType, ResultCodeEnum } from "../../api/api"
import { usersAPI } from "../../api/usersAPI"
import { followTC, usersActionCreators } from "../usersReducer"
jest.mock("../../api/usersAPI")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
  data: {},
  resultCode: ResultCodeEnum.Success,
  messages: [],
}

test("follow must be completed", async () => {
  usersAPIMock.setFollow.mockReturnValue(Promise.resolve(result))
  const thunk = followTC(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()
  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    usersActionCreators.toggleFollowingInProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActionCreators.follow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    usersActionCreators.toggleFollowingInProgress(false, 1)
  )
})
