import React from "react"
import { NavLink } from "react-router-dom"

type OwnPropsType = {
  key: number
  id: number
  name: string
}
const Interlocutor: React.FC<OwnPropsType> = (props) => {
  return <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
}

export default Interlocutor
