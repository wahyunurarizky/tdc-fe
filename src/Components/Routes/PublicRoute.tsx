import { ReactNode } from 'react'
import { useProfile } from '../../Context/profile.context'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfile()
  if (profile) {
    return <Navigate to={'/users'} />
  }

  return <>{children}</>
}

export default PublicRoute
