import { GlobalStateType } from "../store"

export const getInitializedSelector = (state: GlobalStateType) => {
  return state.app.initialized
}
