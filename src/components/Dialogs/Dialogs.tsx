import { useSelector } from "react-redux"
import { GlobalStateType } from "../../redux/store"
import style from "./Dialogs.module.css"
import Interlocutor from "./Interlocutor"
import Messages from "./Messages"

const Dialogs: React.FC = (props) => {
  const dialogsData = useSelector(
    (state: GlobalStateType) => state.dialogsPage.dialogsData
  )
  return (
    <div className={style.dialogs}>
      <div className={style.dialogs__peaple}>
        {dialogsData.map((d) => (
          <Interlocutor key={d.id} id={d.id} name={d.name} />
        ))}
      </div>
      <Messages />
    </div>
  )
}

export default Dialogs
