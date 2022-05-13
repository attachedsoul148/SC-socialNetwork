import style from "../../Users/Users.module.css"
import React, { useEffect, useState } from "react"
import { Button } from "antd"

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  updateUsers: (pageNumber: number) => void
}
const Paginator: React.FC<PropsType> = (props) => {
  let array: Array<number> = []
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  for (let i = 1; i <= pagesCount; i++) {
    array.push(i)
  }
  const portionSize = 10
  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionBorder = (portionNumber - 1) * portionSize - 1
  const rightPortionBorder = portionSize * portionNumber
  useEffect(() => {
    setPortionNumber(Math.ceil(props.currentPage / portionSize))
  }, [props.currentPage])
  return (
    <div>
      {portionNumber > 1 ? (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          Prev
        </Button>
      ) : null}
      {array
        .filter((p) => p <= rightPortionBorder && p >= leftPortionBorder)
        .map((p) => {
          return (
            <Button
              key={p}
              className={p === props.currentPage ? `${style.currentPage}` : ""}
              onClick={() => props.updateUsers(p)}
            >
              {p}
            </Button>
          )
        })}
      {portionNumber < portionCount ? (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          Next
        </Button>
      ) : null}
    </div>
  )
}
export default Paginator
