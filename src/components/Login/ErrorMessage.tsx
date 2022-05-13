import React from "react"
import style from "./Login.module.css"

const Error: React.ComponentType = (props: any) => {
  console.log(props)
  return <div className={style.error}>{props.children}</div>
}
export default Error
