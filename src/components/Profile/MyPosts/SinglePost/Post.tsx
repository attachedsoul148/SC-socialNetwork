import style from "./Post.module.css"
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons"

type OwnPropsType = {
  key: number
  text: string
}
const Post: React.FC<OwnPropsType> = (props) => {
  return (
    <div className={style.post}>
      <Avatar shape="square" size={70} icon={<UserOutlined />} />
      <Input
        size="large"
        placeholder="large size"
        prefix={<UserOutlined />}
        readOnly
        value={props.text}
        className={style.dialogs__messages__message}
      />
    </div>
  )
}

export default Post
