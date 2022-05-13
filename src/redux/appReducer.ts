import { ThunkAction } from "redux-thunk"
import { InferActionTypes } from "../types/types"
import { setAuthDataTC } from "./authReducer"
import { GlobalStateType } from "./store"

type InitialStateType = {
  initialized: boolean
}
const initialState: InitialStateType = {
  initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "proj/app/INITIALIZE": {
      return {
        ...state,
        initialized: true,
      }
    }
    default:
      return state
  }
}

export const appActionCreators = {
  setInitialize: () => ({
    type: "proj/app/INITIALIZE",
  }),
}

export const setInitializeTC = (): ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionsType
> => {
  return async (dispatch) => {
    await dispatch(setAuthDataTC(true))
    dispatch(appActionCreators.setInitialize())
  }
}

export default appReducer

type ActionsType = ReturnType<InferActionTypes<typeof appActionCreators>>
