import React, { createContext, useContext, useEffect, useState } from 'react'
import { IUser } from '../Types/model'
import { getMe } from '../Services/user'

interface IContext {
  profile: IUser | null
  logout: () => void
  reload: () => void
}

const profileContext = createContext<IContext>({
  profile: null,
  logout: () => {
    throw new Error('Function not implemented.')
  },
  reload: () => {
    throw new Error('Function not implemented.')
  }
})

export const ProfileProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [profile, setProfile] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchGetMe = () => {
    getMe()
      .then((user) => setProfile(user))
      .catch(() => {
        setProfile(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchGetMe()
  }, [])

  const logout = () => {
    sessionStorage.removeItem('token')
    fetchGetMe()
  }

  const reload = () => {
    fetchGetMe()
  }

  if (isLoading) return <div>Loading..</div>

  return (
    <profileContext.Provider value={{ profile, logout, reload }}>
      {children}
    </profileContext.Provider>
  )
}

export const useProfile = () => useContext(profileContext)
