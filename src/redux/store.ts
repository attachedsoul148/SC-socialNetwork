import { applyMiddleware, createStore } from "redux"
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import dialogReducer from "./dialogReducer"
import profileReducer from "./profileReducer"
import usersReducer from "./usersReducer"
import thunk from "redux-thunk"
import appReducer from "./appReducer"
import chatReducer from "./chatReducer"

const rootReducer = combineReducers({
  dialogsPage: dialogReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
})

type RootReducerType = typeof rootReducer
export type GlobalStateType = ReturnType<RootReducerType>

export let store = createStore(rootReducer, applyMiddleware(thunk))

export default rootReducer
