import React from 'react'
import { useHasPermission } from '../../hook/permissiondHook'
import { Navigate } from 'react-router-dom'

const PermComponent = ({component, pTitle}) => {
  
  const hasPerm = useHasPermission(pTitle)
  return hasPerm ? component : <Navigate to={-1}/>
}


export default PermComponent