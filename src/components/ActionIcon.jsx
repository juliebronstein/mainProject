
import React from 'react'
import { useHasPermission } from '../hook/permissiondHook'

export const ActionIcon = ({icon,pTitle,...props}) => {
    const hasPerm=useHasPermission(pTitle)
  return hasPerm && (
    <i
          className={`${icon} mx-1 hoverable_text pointer has_tooltip `}
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          {...props}
        ></i>
  )
}
