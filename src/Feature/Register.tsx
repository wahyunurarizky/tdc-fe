import Label from '../Components/Label'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from '../Components/ErrorMessage'
import Swal from 'sweetalert2'
import fetchRegister from '../Services/register'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  )
})

const Register = () => {
  const { errors, touched, submitForm, handleChange, isSubmitting, resetForm } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      validationSchema: SignupSchema,
      onSubmit: async (values) => {
        try {
          await fetchRegister(values)
          Swal.fire(
            'Success',
            'Your account registered successfully',
            'success'
          )
          resetForm()
        } catch (error: unknown) {
          let message = 'unknown error'
          if (error instanceof Error) {
            message = error.message
          }
          Swal.fire(message, '', 'error')
        }
      }
    })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitForm()
      }}
      className="w-full"
    >
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" onChange={handleChange} />
        {errors.name && touched.name ? (
          <ErrorMessage label={errors.name} />
        ) : null}
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="text" name="email" onChange={handleChange} />
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
          onChange={handleChange}
        />
        {errors.password && touched.password ? (
          <ErrorMessage label={errors.password} />
        ) : null}
      </div>
      <div className="mb-4">
        <Label htmlFor="password_confirmation">Pasword Confirmation</Label>
        <Input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          onChange={handleChange}
        />
        {errors.password_confirmation && touched.password_confirmation ? (
          <ErrorMessage label={errors.password_confirmation} />
        ) : null}
      </div>
      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  )
}

export default Register
