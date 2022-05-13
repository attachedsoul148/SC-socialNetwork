import profileReducer, { profileActionCreators } from "../profileReducer"

const initialState = {
  postsData: [
    { id: 1, text: "sth1" },
    { id: 2, text: "sth2" },
  ],
  newPostText: "",
  profile: null,
  profileId: null,
  status: "",
}

test("post should be added, with correct text", () => {
  let addPostAction = profileActionCreators.addPostAC("tilted")
  let state = profileReducer(initialState, addPostAction)
  expect(state.postsData.length).toBe(3)
  expect(state.postsData[2].text).toBe("tilted")
})
