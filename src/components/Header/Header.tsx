import style from "./Header.module.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getLoginSelector } from "../../redux/selectors/headerSelectors"
import { getIsAuthSelector } from "../../redux/selectors/profileSelectors"
import { logoutTC, setAuthDataTC } from "../../redux/authReducer"
import { useEffect } from "react"
import { Avatar, Button, Col, Menu, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"

export const MyHeader: React.FC = (props) => {
  useEffect(() => {
    dispatch(setAuthDataTC(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const login = useSelector(getLoginSelector)
  const isAuth = useSelector(getIsAuthSelector)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutTC())
  }
  return (
    <Row>
      <Col span={18}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="headeritem1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="headeritem2">
            <Link to="/users">Developers</Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={2}>
        {isAuth ? (
          <Button
            className={style.logout_btn}
            onClick={() => {
              logout()
            }}
          >
            Logout
          </Button>
        ) : (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </Col>
      {login ? (
        <Col span={2} style={{ color: "white" }}>
          {login}
        </Col>
      ) : null}
      {login ? (
        <Col span={2}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
      ) : (
        <Col span={4}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
      )}
    </Row>
  )
}
