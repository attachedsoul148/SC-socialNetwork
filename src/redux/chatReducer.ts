import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { chatAPI, StatusType } from "../api/chatAPI"
import { MessageObjType } from "../components/pages/ChatPage"
import { InferActionTypes } from "../types/types"
import { GlobalStateType } from "./store"
import { v4 } from "uuid"

type BLLMessageObjType = MessageObjType & { id: string }
const initialState = {
  messages: [] as BLLMessageObjType[],
  status: "pending" as StatusType,
}
type InitialStateType = typeof initialState

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "proj/chat/MESSAGES_RECEIVED": {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.messages.map((m) => ({ ...m, id: v4() })),
        ].filter((m, index, array) => index >= array.length - 100),
      }
    }
    case "proj/chat/STATUS_CHANGED": {
      return { ...state, status: action.status }
    }
    default:
      return state
  }
}
const chatActions = {
  messagesReceived: (messages: MessageObjType[]) =>
    ({ type: "proj/chat/MESSAGES_RECEIVED", messages } as const),
  statusChanged: (status: StatusType) =>
    ({ type: "proj/chat/STATUS_CHANGED", status } as const),
}
let _MessagesHandler: ((messages: MessageObjType[]) => void) | null = null
const messagesHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
  if (_MessagesHandler === null) {
    _MessagesHandler = (messages) => {
      dispatch(chatActions.messagesReceived(messages))
    }
  }
  return _MessagesHandler
}
let _StatusHandler: ((status: StatusType) => void) | null = null
const statusHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
  if (_StatusHandler === null) {
    _StatusHandler = (status: StatusType) => {
      dispatch(chatActions.statusChanged(status))
    }
  }
  return _StatusHandler
}

export const startMessagesListeningTC = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-recieving", messagesHandlerCreator(dispatch))
    chatAPI.subscribe("status-changing", statusHandlerCreator(dispatch))
  }
}
export const stopMessagesListeningTC = (): ThunkType => {
  return async (dispatch) => {
    const messagesUnsubcribe = chatAPI.subscribe(
      "messages-recieving",
      messagesHandlerCreator(dispatch)
    )
    const statusUnsubcribe = chatAPI.subscribe(
      "status-changing",
      statusHandlerCreator(dispatch)
    )
    messagesUnsubcribe()
    statusUnsubcribe()
    chatAPI.stop()
  }
}
export const sendMessageTC = (message: string): ThunkType => {
  return async () => {
    chatAPI.sendMessage(message)
  }
}

type ActionsType = ReturnType<InferActionTypes<typeof chatActions>>
type ThunkType = ThunkAction<void, GlobalStateType, unknown, ActionsType>
export default chatReducer
