import { ContactType, ProfileDataType, ProfileType } from "../../types/types"
import ProfileDataForm from "./MyPosts/ProfileDataForm"
import Status from "./MyPosts/Status"
import style from "./Profile.module.css"

export type PIOwnPropsType = {
  profile: ProfileType | null
  profileId: number | null
  isAuth: boolean
  status: string
  myID: number | null
  getStatus: (profileId: number) => void
  updateStatus: (status: string) => void
  updateProfileData: (profileData: ProfileDataType) => void
  editMode: boolean
  deactivateEditMode: () => void
  setEditMode: (editMode: boolean) => void
}

const ProfileInfo: React.FC<PIOwnPropsType> = (props) => {
  return props.editMode ? (
    <ProfileDataForm
      {...props}
      deactivateEditMode={props.deactivateEditMode}
      editMode={props.editMode}
    />
  ) : (
    <div className={style.info_container}>
      <div className={style.mainInfo}>
        <div className={style.mainInfo__item}>
          <b>Full name : </b>
          {props.profile ? props.profile.fullName : ""}
        </div>
        <div className={style.mainInfo__item}>
          <b>About me : </b>
          {props.profile ? props.profile.aboutMe : ""}
        </div>
        <div className={style.mainInfo__item}>
          <b>Looking for a job : </b>
          {props.profile && props.profile.lookingForAJob ? "Yes" : "No"}
        </div>
        <div className={style.mainInfo__item}>
          <b>Job description : </b>
          {props.profile ? props.profile.lookingForAJobDescription : ""}
        </div>
        <Status status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div>
        <b>Contacts :</b>
        {props.profile ? (
          Object.keys(props.profile.contacts).map((c) => (
            <Contact key={c} contactName={c} profile={props.profile} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

type CPropsType = {
  key: string
  profile: ProfileType | null
  contactName: string
}
const Contact: React.FC<CPropsType> = (props) => {
  return (
    <div className={style.contact}>
      <b>{props.contactName} :</b>
      <a
        href={
          props.profile
            ? props.profile.contacts[props.contactName as keyof ContactType]
            : ""
        }
      >
        Open URL
      </a>
    </div>
  )
}
export default ProfileInfo
