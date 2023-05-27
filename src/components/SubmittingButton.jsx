import { FastField } from 'formik'
import React from 'react'
import SpinnerLoad from './SpinnerLoad'

export const SubmittingButton = ({tittle}) => {
  return (
    <FastField>
    {({form})=>{
      return(
        <button type="submit" className="btn btn-primary btn-sm" disabled={form.isSubmitting}>
        {tittle}
        {form.isSubmitting?(<SpinnerLoad colorClass={"text-white"} isSmall={true} inline={true} /> ):null}
      </button>
      )
    }}
  </FastField>
  )
}
