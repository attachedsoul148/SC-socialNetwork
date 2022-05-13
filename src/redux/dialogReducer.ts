import { InferActionTypes } from "../types/types"

export type DialogType = {
  name: string
  id: number
}
export type MessageType = {
  text: string
  id: number
}

const initialState = {
  dialogsData: [
    { name: "Stephen", id: 1 },
    { name: "Kevin", id: 2 },
    { name: "Johnny", id: 3 },
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, text: "Hi Bro , what about basketball next week???)" },
    { id: 2, text: "Hi Bro , what about football next sunday???)" },
    { id: 3, text: "Hi Bro , what about baseball today???)" },
  ] as Array<MessageType>,
  newMessageText: "",
}
type InitialStateType = typeof initialState

const dialogReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "proj/dialogs/ADD_MESSAGE": {
      let stateCopy = { ...state }
      stateCopy.newMessageText = action.newMessage
      stateCopy.messagesData = [...state.messagesData]
      let newMessage = { id: 4, text: stateCopy.newMessageText }
      stateCopy.messagesData.push(newMessage)
      stateCopy.newMessageText = ""
      return stateCopy
    }
    default:
      return state
  }
}
export const dialogsActionCreators = {
  addMessageAC: (newMessage: string) =>
    ({ type: "proj/dialogs/ADD_MESSAGE", newMessage } as const),
}

export default dialogReducer

type ActionsType = ReturnType<InferActionTypes<typeof dialogsActionCreators>>
