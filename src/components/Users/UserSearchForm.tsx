import { Field, Form, Formik } from "formik"
import style from "./Users.module.css"
import React from "react"
import { getFilterSelector } from "../../redux/selectors/userSelectors"
import { useSelector } from "react-redux"
import { Button, Input } from "antd"

type InitialValuesType = {
  term: string
  friend: "null" | "true" | "false"
}
type PropsType = {
  updateFilter: (filter: FilterType) => void
}
export type FilterType = {
  term: string
  friend: null | boolean
}
const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getFilterSelector)
  const initialValues = {
    term: filter.term,
    friend: String(filter.friend) as "null" | "true" | "false",
  }
  const onSubmit = (values: InitialValuesType) => {
    const filter = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    }
    props.updateFilter(filter)
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form className={style.form}>
            <Field
              name="term"
              id="term"
              type="text"
              as={Input}
              style={{ width: "60%" }}
            ></Field>
            <Field as="select" name="friend" className={style.selector}>
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <Button htmlType="submit">Find</Button>
          </Form>
        )
      }}
    </Formik>
  )
})
export default UserSearchForm
