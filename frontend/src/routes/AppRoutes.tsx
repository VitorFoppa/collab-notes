import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'

import { Dashboard } from '../pages/Dashboard'
import { Notes } from '../pages/Notes'
import { Profile } from '../pages/Profile'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

import { PrivateRoute } from './PrivateRoute'

export function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PRIVATE */}

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/notes"
            element={<Notes />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}