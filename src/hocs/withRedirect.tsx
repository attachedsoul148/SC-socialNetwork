import React from "react"
import { Navigate } from "react-router-dom"

const withRedirect = (Component: React.FC<any>) => {
  const RedirectContainer = (props: any) => {
    if (props.isAuth === false) return <Navigate to="/login" />
    return <Component {...props} />
  }
  return RedirectContainer
}
export default withRedirect
