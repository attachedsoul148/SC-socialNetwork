import dialogReducer, { dialogsActionCreators } from "../dialogReducer"

const initialState = {
  dialogsData: [
    { name: "Pasha", id: 1 },
    { name: "Andrew", id: 2 },
    { name: "John", id: 3 },
  ],
  messagesData: [
    { id: 1, text: "sth1" },
    { id: 2, text: "sth2" },
    { id: 3, text: "sth3" },
  ],
  newMessageText: "",
}

test("message should be added, with correct text", () => {
  let addPostAction = dialogsActionCreators.addMessageAC("tilted")
  let state = dialogReducer(initialState, addPostAction)
  expect(state.messagesData.length).toBe(4)
  expect(state.messagesData[3].text).toBe("tilted")
})
