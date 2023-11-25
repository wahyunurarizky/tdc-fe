import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Auth from './Pages/Auth'
import Users from './Pages/Users'
import { ProfileProvider } from './Context/profile.context'
import PublicRoute from './Components/Routes/PublicRoute'
import PrivateRoute from './Components/Routes/PrivateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
    </>
  )
)
function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  )
}

export default App
