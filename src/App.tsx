import { Link, Route, Routes } from "react-router-dom"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import "antd/dist/antd.css"
//import ProfileContainer from './components/Profile/ProfileContainer'
import LoginContainer from "./components/Login/Login"
import { setInitializeTC } from "./redux/appReducer"
import React, { useEffect } from "react"
import Preloader from "./components/common/Preloader/Preloader"
import { Users } from "./components/Users/Users"
import { getInitializedSelector } from "./redux/selectors/appSelectors"
import { Breadcrumb, Layout, Menu, Result, Button, Alert } from "antd"
import { Footer } from "antd/lib/layout/layout"
import {
  UserOutlined,
  MessageOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons"
import { getMyIdSelector } from "./redux/selectors/profileSelectors"
import { MyHeader } from "./components/Header/Header"
import Dialogs from "./components/Dialogs/Dialogs"
const Profile = React.lazy(() => import("./components/Profile/Profile"))
const Chat = React.lazy(() => import("./components/pages/ChatPage"))
const { Header, Content, Sider } = Layout

const App: React.FC = (props) => {
  const initialized = useSelector(getInitializedSelector)
  const myId = useSelector(getMyIdSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setInitializeTC())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return initialized ? (
    <Layout>
      <Header className="header">
        <MyHeader />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu mode="inline" style={{ height: "101%" }}>
              <Menu.SubMenu
                title="Own Data"
                icon={<UserOutlined />}
                key="menuitem1"
              >
                <Menu.Item icon={<ProfileOutlined />} key="submenuitem1">
                  <Link to={`/profile/${myId}`}>Profile</Link>
                </Menu.Item>
                <Menu.Item icon={<MessageOutlined />} key="submenuitem2">
                  <Link to="/dialogs">Messages</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="menuitem2"
                icon={<UsergroupDeleteOutlined />}
                title="Developers"
              >
                <Menu.Item
                  icon={<UsergroupDeleteOutlined />}
                  key="submenuitem3"
                  title="Users"
                >
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item
                  icon={<MessageOutlined />}
                  key="submenuitem4"
                  title="Chat"
                >
                  <Link to="/chat">Chat</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Alert
                    message="Informational Notes"
                    description="Hi , you are welcome on the best network home page , enjoy yourself!"
                    type="info"
                    showIcon
                  />
                }
              />
              <Route
                path="/profile/:userId/*"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <Profile />
                  </React.Suspense>
                }
              />
              <Route path="/dialogs/*" element={<Dialogs />} />
              <Route path="/users/*" element={<Users />} />
              <Route path="/login/*" element={<LoginContainer />} />
              <Route
                path="*"
                element={
                  <Result
                    status="warning"
                    title="There are some problems with your operation."
                    extra={
                      <Button type="primary" key="console">
                        <Link to="/">Come to home page</Link>
                      </Button>
                    }
                  />
                }
              />
              <Route
                path="/chat"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <Chat />
                  </React.Suspense>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Network ©2022 Created by attachedsoul148
      </Footer>
    </Layout>
  ) : (
    <Preloader />
  )
}
export default App
