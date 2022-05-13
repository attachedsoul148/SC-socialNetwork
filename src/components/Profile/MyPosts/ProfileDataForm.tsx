import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import Error from "../../Login/ErrorMessage"
import { ContactType } from "../../../types/types"
import { PIOwnPropsType } from "../ProfileInfo"
import { Button, Input, Modal } from "antd"
import style from "./../Profile.module.css"

type AdditionalPropsType = {
  deactivateEditMode: () => void
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  lookingForAJobDescription: Yup.string().required("Required"),
  lookingForAJob: Yup.string().required("Required"),
  aboutMe: Yup.string().required("Required"),
  contacts: Yup.object({
    github: Yup.string().url("Invalid ULR format").required("Required"),
    vk: Yup.string().url("Invalid ULR format").required("Required"),
    facebook: Yup.string().url("Invalid ULR format").required("Required"),
    instagram: Yup.string().url("Invalid ULR format").required("Required"),
    twitter: Yup.string().url("Invalid ULR format").required("Required"),
    website: Yup.string().url("Invalid ULR format").required("Required"),
    youtube: Yup.string().url("Invalid ULR format").required("Required"),
    mainLink: Yup.string().url("Invalid ULR format").required("Required"),
  }),
})
const ProfileDataForm: React.FC<PIOwnPropsType & AdditionalPropsType> = (
  props
) => {
  const initialValues = {
    fullName: props.profile ? props.profile.fullName : "",
    aboutMe: props.profile ? props.profile.aboutMe : "",
    lookingForAJob: props.profile ? props.profile.lookingForAJob : false,
    lookingForAJobDescription: props.profile
      ? props.profile.lookingForAJobDescription
      : "",
    contacts: {
      github: props.profile ? props.profile.contacts.github : "",
      vk: props.profile ? props.profile.contacts.vk : "",
      facebook: props.profile ? props.profile.contacts.facebook : "",
      instagram: props.profile ? props.profile.contacts.instagram : "",
      twitter: props.profile ? props.profile.contacts.twitter : "",
      website: props.profile ? props.profile.contacts.website : "",
      youtube: props.profile ? props.profile.contacts.youtube : "",
      mainLink: props.profile ? props.profile.contacts.mainLink : "",
    },
  }
  type ProfileValuesType = {
    lookingForAJob: boolean
    aboutMe: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
  }
  const onSubmit = (values: ProfileValuesType) => {
    if (props.myID) {
      const profileData = { ...values, userId: props.myID }
      props.updateProfileData(profileData)
      props.deactivateEditMode()
    }
  }
  return (
    <Modal
      title="Profile Settings"
      visible={props.editMode}
      onCancel={props.deactivateEditMode}
      keyboard
      footer={null}
    >
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <Form>
              <div>
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={!formik.isValid && formik.dirty}
                  className={style.sub__btn}
                >
                  Save changes
                </Button>
                <div>
                  <div>
                    <b>Full name :</b>
                    <Field name="fullName" id="fullName" as={Input} />
                    <ErrorMessage name="fullName" component={Error} />
                  </div>
                  <div>
                    <b>About me :</b>
                    <Field name="aboutMe" id="aboutMe" as={Input} />
                    <ErrorMessage name="aboutMe" component={Error} />
                  </div>
                  <div>
                    <b>Looking for a job :</b>
                    <Field
                      name="lookingForAJob"
                      id="lookingForAJob"
                      type="checkbox"
                      as={Input}
                    />
                    <ErrorMessage name="lookingForAJob" component={Error} />
                  </div>
                  <div>
                    <b>Job description :</b>
                    <Field
                      name="lookingForAJobDescription"
                      id="lookingForAJobDescription"
                      as={Input}
                    />
                    <ErrorMessage
                      name="lookingForAJobDescription"
                      component={Error}
                    />
                  </div>
                </div>
                <div>
                  {props.profile ? (
                    Object.keys(props.profile.contacts).map((c) => (
                      <div key={c}>
                        <b>{c} :</b>
                        <Field
                          name={`contacts.${c}`}
                          id={`contacts.${c}`}
                          as={Input}
                        />
                        <ErrorMessage
                          name={`contacts.${c}`}
                          component={Error}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
export default ProfileDataForm
