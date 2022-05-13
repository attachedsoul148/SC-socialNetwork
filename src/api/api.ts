import axios from "axios"

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "fb6eb257-2215-4949-89e7-c08531fe8b78",
  },
})
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeCaptchaEnum {
  captchaIsRequired = 10,
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
