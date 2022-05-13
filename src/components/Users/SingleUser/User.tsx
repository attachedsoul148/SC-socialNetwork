import style from "./../Users.module.css"
import { NavLink } from "react-router-dom"
import { UserType } from "../../../types/types"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"

type PropsType = {
  user: UserType
  key: number
  followingInProgress: Array<number>
  followThunk: (userId: number) => void
  unFollowThunk: (userId: number) => void
}
const User = (props: PropsType) => {
  return (
    <div className={style.usersInfo__item} key={props.user.id}>
      <div className={style.usersInfo__imgContainer}>
        <div className={style.usersInfo__img}>
          <NavLink to={"/profile/" + props.user.id}>
            <Avatar
              shape="square"
              size={70}
              icon={<UserOutlined />}
              src={
                props.user.photos.small ? (
                  props.user.photos.small
                ) : (
                  <UserOutlined />
                )
              }
            />
          </NavLink>
        </div>
        <div className={style.usersInfo__img__btn}>
          {props.user.followed ? (
            <Button
              className={style.usersInfo__imgContainer__button}
              disabled={props.followingInProgress.some(
                (id) => id === props.user.id
              )}
              onClick={() => {
                props.unFollowThunk(props.user.id)
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              disabled={props.followingInProgress.some(
                (id) => id === props.user.id
              )}
              onClick={() => {
                props.followThunk(props.user.id)
              }}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
      <div className={style.usersInfo__info}>
        <div className={style.usersInfo__info__aboveItem}>
          <span>{props.user.name}</span>
          <span></span>
        </div>
        <div className={style.usersInfo__info__underItem}>
          <span>{props.user.status}</span>
          <span></span>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default User
