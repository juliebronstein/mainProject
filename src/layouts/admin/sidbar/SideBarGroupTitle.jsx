import React from 'react'

export const SideBarGroupTitle = ({title}) => {
  return (
    <div className="py-1 text-start d-flex justify-content-center no_pointer no_hover sideber-item">
        <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
    </div>
  )
}
