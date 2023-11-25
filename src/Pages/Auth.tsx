import { useState } from 'react'
import Login from '../Feature/Login'
import Register from '../Feature/Register'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className=" flex p-8">
      <div className="flex flex-col gap-8 items-center m-auto bg-emerald-200 rounded-md shadow-md p-8">
        <div className="text-center">
          <h1 className="font-semibold text-center text-2xl">
            Wahyu Nur Arizky - Fullstack Developer
          </h1>
          <span>Created with Laravel - React - Tailwind</span>
        </div>
        {isLogin ? <Login /> : <Register />}
        {isLogin ? (
          <span>
            Don't have an account?{' '}
            <button
              className="underline font-semibold"
              onClick={() => {
                setIsLogin(false)
              }}
            >
              Register
            </button>
          </span>
        ) : (
          <span>
            have an account?{' '}
            <button
              className="underline font-semibold"
              onClick={() => {
                setIsLogin(true)
              }}
            >
              Sign In
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default Auth
