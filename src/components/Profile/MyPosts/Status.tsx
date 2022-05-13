import { Input } from "antd"
import React, { ChangeEvent, useEffect, useState } from "react"

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}
const Status: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false)
  let [localStatus, setLocalStatus] = useState(props.status)
  useEffect(() => {
    setLocalStatus(props.status)
  }, [props.status])
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.currentTarget.value)
  }
  const onStatusBlur = () => {
    props.updateStatus(localStatus)
    setEditMode(!editMode)
  }
  return (
    <>
      <b>Status :</b>
      {editMode ? (
        <Input
          title="input"
          autoFocus={true}
          onChange={(e) => {
            onStatusChange(e)
          }}
          onBlur={() => {
            onStatusBlur()
          }}
          value={localStatus ? localStatus : ""}
        />
      ) : (
        <span
          title="span"
          onDoubleClick={() => {
            setEditMode(!editMode)
          }}
        >
          {localStatus ? props.status : "(-__-)"}
        </span>
      )}
    </>
  )
}

export default Status
