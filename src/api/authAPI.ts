import {
  APIResponseType,
  instance,
  ResultCodeCaptchaEnum,
  ResultCodeEnum,
} from "./api"

type MeDataType = {
  id: number
  email: string
  login: string
}
type LoginDataType = {
  userId: number
}
type GetCaptchaDataType = {
  url: string
}

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeDataType>>("auth/me")
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string
  ) {
    return instance.post<
      APIResponseType<LoginDataType, ResultCodeEnum | ResultCodeCaptchaEnum>
    >("/auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    })
  },
  logout() {
    return instance.delete<APIResponseType>("/auth/login")
  },
  getCaptcha() {
    return instance.get<GetCaptchaDataType>("/security/get-captcha-url")
  },
}
