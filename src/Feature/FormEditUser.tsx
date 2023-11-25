import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import Label from '../Components/Label'
import Input from '../Components/Input'
import ErrorMessage from '../Components/ErrorMessage'
import Button from '../Components/Button'
import ReactModal from 'react-modal'
import { updateUser } from '../Services/user'
import { IUser } from '../Types/model'

interface Props extends ReactModal.Props {
  user: IUser
  reload: () => void
}
const CreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!')
})

const FormEditUser = (props: Props) => {
  const {
    errors,
    values,
    touched,
    submitForm,
    handleChange,
    isSubmitting,
    resetForm,
    setValues
  } = useFormik<{ name: string; email: string; password?: string }>({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: CreateSchema,
    onSubmit: async (values) => {
      try {
        if (!values.password) delete values.password
        await updateUser(values, props.user.id)
        Swal.fire('Success', 'User updated successfully', 'success')
        resetForm()
        props.reload()
      } catch (error: unknown) {
        let message = 'unknown error'
        if (error instanceof Error) {
          message = error.message
        }
        Swal.fire(message, '', 'error')
      }
    }
  })

  useEffect(() => {
    setValues({
      email: props.user.email,
      name: props.user.name,
      password: ''
    })
  }, [props.user])

  return (
    <ReactModal
      {...props}
      onAfterClose={() => {
        resetForm()
      }}
      ariaHideApp={false}
    >
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-center text-xl">Update user</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          className="w-full"
        >
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              autoFocus
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name ? (
              <ErrorMessage label={errors.name} />
            ) : null}
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <ErrorMessage label={errors.email} />
            ) : null}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <ErrorMessage label={errors.password} />
            ) : null}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" onClick={props.onRequestClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </ReactModal>
  )
}

export default FormEditUser
