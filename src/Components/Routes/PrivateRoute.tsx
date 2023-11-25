import { ReactNode } from 'react'
import { useProfile } from '../../Context/profile.context'
import { Navigate } from 'react-router-dom'
import Button from '../Button'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { profile, logout } = useProfile()

  if (!profile) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="">
      <div className="fixed w-full bg-red-200 p-4 flex justify-between">
        <span className="font-medium">{profile.name}</span>
        <Button
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </div>
      <div className="pt-20">{children}</div>
    </div>
  )
}

export default PrivateRoute
