import style from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo"
import Preloader from "../common/Preloader/Preloader"
import { ChangeEvent, useEffect, useState } from "react"
import { ProfileDataType } from "../../types/types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons"
import {
  getIsAuthSelector,
  getMyIdSelector,
  getProfileIdSelector,
  getProfileSelector,
  getStatusSelector,
} from "../../redux/selectors/profileSelectors"
import {
  getStatusTC,
  setUserProfileTC,
  updateAvatarTC,
  updateStatusTC,
  updateProfileDataTC,
} from "../../redux/profileReducer"
import { MyPosts } from "./MyPosts/MyPosts"
import { Image, Button } from "antd"

const Profile: React.FC = (props) => {
  const profile = useSelector(getProfileSelector)
  const profileId = useSelector(getProfileIdSelector)
  const isAuth = useSelector(getIsAuthSelector)
  const status = useSelector(getStatusSelector)
  const myID = useSelector(getMyIdSelector)

  let params = useParams()

  const isOwner = Number(params.userId) === myID

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserProfileTC(Number(params.userId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId])
  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      dispatch(updateAvatarTC(e.currentTarget.files[0]))
    }
  }
  const getStatus = (profileId: number) => {
    dispatch(getStatusTC(profileId))
  }
  const updateStatus = (status: string) => {
    dispatch(updateStatusTC(status))
  }
  const updateProfileData = (profileData: ProfileDataType) => {
    dispatch(updateProfileDataTC(profileData))
  }
  const [editMode, setEditMode] = useState(false)
  const deactivateEditMode = () => {
    setEditMode(false)
  }
  const [visible, setVisible] = useState(false)
  if (!profile) {
    return <Preloader />
  } else {
    return (
      <div className={style.profile}>
        <div className={style.avatar_container}>
          <div className={style.direction}>
            <Image
              width={200}
              style={{ display: "none", marginRight: "2000" }}
              src={profile.photos.large ? profile.photos.large : "logo"}
              preview={{
                visible,
                src: profile.photos.large ? profile.photos.large : "logo",
                onVisibleChange: (value) => {
                  setVisible(value)
                },
              }}
            />
            <Avatar
              className={style.ava}
              shape="square"
              size={200}
              icon={<UserOutlined />}
              src={
                profile.photos.large ? profile.photos.large : <UserOutlined />
              }
            />
            <Button
              type="default"
              onClick={() => setVisible(true)}
              style={{ width: "120px" }}
            >
              Show image
            </Button>
            {isOwner ? (
              <Button
                onClick={() => setEditMode(true)}
                style={{ width: "120px" }}
                className={style.btn_edit}
              >
                Edit profile
              </Button>
            ) : null}
            {isOwner ? (
              <Input
                placeholder="File"
                type="file"
                className={style.file_input}
                onChange={(e) => {
                  onPhotoChange(e)
                }}
              />
            ) : null}
          </div>
        </div>
        <ProfileInfo
          editMode={editMode}
          deactivateEditMode={deactivateEditMode}
          setEditMode={setEditMode}
          getStatus={getStatus}
          updateStatus={updateStatus}
          updateProfileData={updateProfileData}
          profile={profile}
          profileId={profileId}
          isAuth={isAuth}
          status={status}
          myID={myID}
        />
        <MyPosts />
      </div>
    )
  }
}
export default Profile
