/*component to protect routes and role permissions*/

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes({isAllowed, redirectPath='/', children}) {
    if(!isAllowed){
        return <Navigate to={redirectPath} replace/>
    }
  return (
    typeof children !== 'undefined' ? children : <Outlet/>
  )
}
