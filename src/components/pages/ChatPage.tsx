import { Avatar, Button, Input, message } from "antd"
import { Field, Form, Formik } from "formik"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  sendMessageTC,
  startMessagesListeningTC,
  stopMessagesListeningTC,
} from "../../redux/chatReducer"
import { GlobalStateType } from "../../redux/store"
import style from "./chat.module.css"

export type MessageObjType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const Chat: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startMessagesListeningTC())
    return () => {
      dispatch(stopMessagesListeningTC())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className={style.wrapper}>
        <ChatMessages />
      </div>
      <ChatAddMsgForm />
    </div>
  )
})

const ChatMessages: React.FC = React.memo(() => {
  const messages = useSelector((state: GlobalStateType) => state.chat.messages)
  const divRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollElement = e.currentTarget
    if (
      scrollElement.scrollHeight - scrollElement.scrollTop !==
      scrollElement.clientHeight
    ) {
      setIsAutoScroll(false)
    } else {
      setIsAutoScroll(true)
    }
  }
  useEffect(() => {
    if (isAutoScroll) {
      divRef.current?.scrollIntoView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])
  return (
    <div className={style.messagesContainer} onScroll={(e) => scrollHandler(e)}>
      {messages.map((msg) => (
        <SingleChatMessage
          key={msg.id}
          text={msg.message}
          photoURL={msg.photo}
          author={msg.userName}
        />
      ))}
      <div ref={divRef}></div>
    </div>
  )
})

type PropsType = {
  key: string
  text: string
  photoURL: string
  author: string
}
const SingleChatMessage: React.FC<PropsType> = React.memo(
  ({ text, photoURL, author }) => {
    return (
      <div className={style.singleMsgWrapper}>
        <Avatar
          shape="square"
          size={70}
          src={photoURL}
          style={{ margin: "10px" }}
        />
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "20px", margin: "-6px 0px 6px 0px" }}>
            {author}
          </p>
          <Input readOnly value={text} style={{}} maxLength={100} />
        </div>
      </div>
    )
  }
)

const ChatAddMsgForm: React.FC = React.memo(() => {
  const status = useSelector((state: GlobalStateType) => state.chat.status)
  const dispatch = useDispatch()
  const initialValues = { chatMessage: "" }
  const onSubmit = (values: typeof initialValues) => {
    if (values.chatMessage !== "") {
      dispatch(sendMessageTC(values.chatMessage))
      message.info("Message was sent", 3)
    } else {
      message.warn("You must write sth in!!!")
    }
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form className={style.formContainer}>
            <Field
              name="chatMessage"
              id="chatMessage"
              as={Input}
              style={{
                width: "50%",
                marginBottom: "10px",
                textAlign: "center",
              }}
            />
            <Button htmlType="submit" disabled={status !== "ready"}>
              Send Message
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
})
export default Chat
