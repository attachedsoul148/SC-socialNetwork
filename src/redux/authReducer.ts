import { ThunkAction } from "redux-thunk"
import { ResultCodeCaptchaEnum, ResultCodeEnum } from "../api/api"
import { authAPI } from "../api/authAPI"
import { DataType, InferActionTypes } from "../types/types"
import { GlobalStateType } from "./store"

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
  errorMessage: null as string | null,
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "proj/auth/SET_AUTH_DATA": {
      return {
        ...state,
        id: action.data.id,
        email: action.data.email,
        login: action.data.login,
        isAuth: action.isAuth,
      }
    }
    case "proj/auth/SET_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    }
    case "proj/auth/SET_CAPTCHA_URL": {
      return { ...state, captchaURL: action.captchaURL }
    }
    default:
      return state
  }
}

export const authActionCreators = {
  setAuthData: (data: DataType, isAuth: boolean) =>
    ({
      type: "proj/auth/SET_AUTH_DATA",
      data,
      isAuth,
    } as const),
  setErrorMessage: (errorMessage: string) =>
    ({
      type: "proj/auth/SET_ERROR_MESSAGE",
      errorMessage,
    } as const),
  setCaptchaURL: (captchaURL: string) =>
    ({
      type: "proj/auth/SET_CAPTCHA_URL",
      captchaURL,
    } as const),
}

//thunk creators
export const setAuthDataTC = (willAuthBe: boolean): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(authActionCreators.setAuthData(response.data.data, willAuthBe))
    }
  }
}
export const loginTC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(setAuthDataTC(true))
    } else {
      const errorMessage = response.data.messages[0]
      dispatch(authActionCreators.setErrorMessage(errorMessage))
      if (
        response.data.resultCode === ResultCodeCaptchaEnum.captchaIsRequired
      ) {
        dispatch(getCaptchaTC())
      }
    }
  }
}
export const logoutTC = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(
        authActionCreators.setAuthData(
          { id: null, email: null, login: null },
          false
        )
      )
    }
  }
}
export const getCaptchaTC = () => {
  return async (dispatch: any) => {
    const response = await authAPI.getCaptcha()
    const captchaURL = response.data.url
    dispatch(authActionCreators.setCaptchaURL(captchaURL))
  }
}

export default authReducer

type ActionsType = ReturnType<InferActionTypes<typeof authActionCreators>>
type ThunkType = ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionsType
>
