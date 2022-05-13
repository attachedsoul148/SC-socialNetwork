import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import style from "./Login.module.css"
import Error from "./ErrorMessage"
import { Button, Input } from "antd"

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
  captcha: "",
}
type OwnPropsType = {
  myId: number | null
  errorMessage: string | null
  captchaURL: string | null
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void
}
type ValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const LoginForm: React.FC<OwnPropsType> = (props) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid format").required("Required"),
    password: Yup.string().required("Required"),
    capthcha: Yup.string(), //there must be multiply conditinal validation
  })
  const onSubmit = (values: ValuesType) => {
    props.login(
      values.email,
      values.password,
      values.rememberMe,
      values.captcha
    )
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <div className={style.formWrapper}>
              <div className={style.formWrapper__item}>
                <label htmlFor="name">E-mail</label>
                <Field type="email" name="email" id="email" as={Input} />
                <ErrorMessage name="email" component={Error} />
              </div>
              <div className={style.formWrapper__item}>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  as={Input}
                />
                <ErrorMessage name="password" component={Error} />
              </div>
              <div className={style.formWrapper__item}>
                <label htmlFor="rememberMe">Remember me</label>
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  as={Input}
                />
              </div>
              {props.captchaURL ? (
                <div className={style.formWrapper__item}>
                  <img
                    src={props.captchaURL}
                    alt="Captcha"
                    className={style.captchaImg}
                  />
                  <Field name="captcha" id="captcha" />
                  <ErrorMessage name="captcha" component={Error} />
                </div>
              ) : null}
              {props.errorMessage ? (
                <p className={style.errorParagraf}>{props.errorMessage}</p>
              ) : null}
              <Button
                htmlType="submit"
                disabled={!formik.isValid && formik.dirty}
              >
                Submit
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
