import { Button, Input, message } from "antd"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { profileActionCreators } from "../../../redux/profileReducer"
import { getPostsDataSelector } from "../../../redux/selectors/profileSelectors"
import style from "./MyPosts.module.css"
import Post from "./SinglePost/Post"

export const MyPosts: React.FC = (props) => {
  const postsData = useSelector(getPostsDataSelector)
  const initialValues = {
    post: "",
  }
  const dispatch = useDispatch()
  const onSubmit = (values: { post: string }) => {
    if (values.post === "") {
      message.info("You must write sth down")
    } else {
      dispatch(profileActionCreators.addPostAC(values.post))
      values.post = ""
      // todo : make working string clearing
    }
  }
  return (
    <div className={style.all_posts}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <Field name="post" id="post" as={Input} />
              <Button htmlType="submit" className={style.all_posts__btn}>
                Post
              </Button>
            </Form>
          )
        }}
      </Formik>
      {postsData.map((p) => (
        <Post key={p.id} text={p.text} />
      ))}
    </div>
  )
}
