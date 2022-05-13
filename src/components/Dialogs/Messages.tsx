import { Button, Input } from "antd"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { dialogsActionCreators } from "../../redux/dialogReducer"
import { GlobalStateType } from "../../redux/store"
import style from "./Dialogs.module.css"
import SingleMessage from "./SingleMessage"

const initialValues = {
  message: "",
}

const Messages: React.FC = (props) => {
  const dispatch = useDispatch()
  const onSubmit = (values: { message: string }) => {
    dispatch(dialogsActionCreators.addMessageAC(values.message))
    values.message = ""
    // todo : make working string clearing
  }
  const messagesData = useSelector(
    (state: GlobalStateType) => state.dialogsPage.messagesData
  )
  return (
    <div className={style.dialogs__messages}>
      {messagesData.map((m) => (
        <SingleMessage key={m.id} text={m.text} />
      ))}
      <div className={style.dialogs__messages__sendwr}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className={style.dialogs__messages__form}>
                <Field name="message" id="message" as={Input} />
                <Button htmlType="submit">Send</Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default Messages
