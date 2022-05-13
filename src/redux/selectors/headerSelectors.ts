import { GlobalStateType } from "../store"

export const getLoginSelector = (state: GlobalStateType) => {
  return state.auth.login
}
