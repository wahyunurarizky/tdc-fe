import Label from '../Components/Label'
import Input from '../Components/Input'
import Button from '../Components/Button'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import fetchLogin from '../Services/login'
import Swal from 'sweetalert2'
import ErrorMessage from '../Components/ErrorMessage'
import { useProfile } from '../Context/profile.context'

const signinSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required')
})
const Login = () => {
  const { reload } = useProfile()

  const { errors, touched, submitForm, handleChange, isSubmitting, resetForm } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: signinSchema,
      onSubmit: async (values) => {
        try {
          const { token } = await fetchLogin(values)
          sessionStorage.setItem('token', token)
          reload()
          Swal.fire('Success', 'successfully logged in', 'success')
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
      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isSubmitting}>
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default Login
