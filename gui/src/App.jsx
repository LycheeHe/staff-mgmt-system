import { lazy } from 'react'
import { createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom'
import './App.scss'
import Header from './layout/Header'
import Staff from './page/Staff'
import Admin from './page/Admin'
import StaffProvider from './page/Staff/useStaffContext'
import AdminProvider from './page/Admin/useAdminContext'

// const Home = lazy(() => import('./page/Home'))
// const Staff = lazy(() => import('./page/Staff'))
// const Admin = lazy(() => import('./page/Admin'))

const browserRouter = createBrowserRouter([
  {
    path: '/staff',
    element: <StaffProvider>
      <Header />
      <Staff />
    </StaffProvider>
  },
  {
    path: '/admin',
    element: <AdminProvider>
      <Header />
      <Admin />
    </AdminProvider>
  }
  // { path: '/', Component: lazy(() => import('./page/Home')) },
  // { path: '/staff', Component: lazy(() => import('./page/Staff')) },
  // { path: '/admin', Component: lazy(() => import('./page/Admin')) },

])

function App() {
  return (
    <div className="lucky-draw-app">
      <RouterProvider router={browserRouter} />
      <div className="sticky-container">
        <button className='log-out-button'>Logout</button>
      </div>
    </div>
  )
}

export default App
