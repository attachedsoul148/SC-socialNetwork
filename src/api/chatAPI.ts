import { message } from "antd"
import { MessageObjType } from "../components/pages/ChatPage"

let ws: WebSocket | null = null
let subscribers = {
  "messages-recieving": [] as MessagesRecievingSubscriberType[],
  "status-changing": [] as StatusChangingSubscriberType[],
}
const statusChanger = (status: StatusType) => {
  subscribers["status-changing"].forEach((sub) => sub(status))
}
const closeHandler = () => {
  message.warning(
    "WebSocket Channel was closed , pls refresh page , or wait for reconnecting",
    10
  )
  statusChanger("pending")
  setTimeout(createChannel, 3000)
}
const messagesHandler = (e: MessageEvent) => {
  let messages = JSON.parse(e.data)
  subscribers["messages-recieving"].forEach((m) => m(messages))
}
const errorHandler = () => {
  statusChanger("error")
  message.warning("Some WebSocket error was occured , pls refresh page", 10)
}
const openHandler = () => {
  statusChanger("ready")
}
const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler)
  ws?.removeEventListener("message", messagesHandler)
  ws?.removeEventListener("open", openHandler)
  ws?.removeEventListener("error", errorHandler)
}
const createChannel = () => {
  cleanUp()
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  )
  ws.addEventListener("close", closeHandler)
  ws.addEventListener("message", messagesHandler)
  ws.addEventListener("open", openHandler)
  ws.addEventListener("error", errorHandler)
}
export const chatAPI = {
  subscribe: (
    eventName: EventsNameType,
    callback: MessagesRecievingSubscriberType | StatusChangingSubscriberType
  ) => {
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      //@ts-ignore
      subscribers[eventName].filter((sub) => sub !== callback)
    }
  },
  start: () => {
    createChannel()
  },
  stop: () => {
    subscribers["messages-recieving"] = []
    subscribers["status-changing"] = []
    cleanUp()
    ws?.close()
  },
  sendMessage: (message: string) => {
    ws?.send(message)
  },
}
export type StatusType = "pending" | "ready" | "error"
export type EventsNameType = "messages-recieving" | "status-changing"
type MessagesRecievingSubscriberType = (messages: MessageObjType[]) => void
type StatusChangingSubscriberType = (status: StatusType) => void
