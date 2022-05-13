import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import { loginTC } from "../../redux/authReducer"
import { Navigate } from "react-router-dom"
import { GlobalStateType } from "../../redux/store"
import {
  getIsAuthSelector,
  getMyIdSelector,
} from "../../redux/selectors/profileSelectors"

const Login: React.FC = (props) => {
  const isAuth = useSelector(getIsAuthSelector)
  const myId = useSelector(getMyIdSelector)
  const errorMessage = useSelector(
    (state: GlobalStateType) => state.auth.errorMessage
  )
  const captchaURL = useSelector(
    (state: GlobalStateType) => state.auth.captchaURL
  )
  const dispatch = useDispatch()
  const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => {
    dispatch(loginTC(email, password, rememberMe, captcha))
  }
  return isAuth ? (
    <Navigate to={"/profile/" + myId} />
  ) : (
    <LoginForm
      captchaURL={captchaURL}
      myId={myId}
      errorMessage={errorMessage}
      login={login}
    />
  )
}

export default Login
