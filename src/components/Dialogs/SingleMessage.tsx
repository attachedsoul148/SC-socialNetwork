import style from "./Dialogs.module.css"
import { Input } from "antd"
import { UserOutlined } from "@ant-design/icons"

type OwnPropsType = {
  key: number
  text: string
}
const SingleMessage: React.FC<OwnPropsType> = (props) => {
  return (
    <Input
      size="large"
      placeholder="large size"
      prefix={<UserOutlined />}
      readOnly
      value={props.text}
      className={style.dialogs__messages__message}
    />
  )
  //<div className={style.dialogs__messages__message}>{props.text}</div>
}

export default SingleMessage
