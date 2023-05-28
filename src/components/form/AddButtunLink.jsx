import React from 'react'
import { Link } from 'react-router-dom'

export const AddButtunLink = ({link,modal}) => {
  return (
    <Link to={link}>
    <span
    className="btn btn-success d-flex justify-content-center align-items-center"
    data-bs-toggle="modal"
    data-bs-target={modal}
  >
    <i className="fas fa-plus text-light"></i>
  </span>
    </Link>
  )
}
