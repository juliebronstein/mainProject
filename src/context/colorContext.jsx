import React, { useState } from 'react'
import { createContext } from "react";


export const colorContex=createContext({
    editeIdctx:null,
    setEditeIdctx:()=>{}
})

export const ColorContexContainer = ({children}) => {
    const [editeIdctx, setEditeIdctx] = useState(null)
  return (
    <colorContex.Provider value={{
        editeIdctx,
        setEditeIdctx
    }}>
        {children}
    </colorContex.Provider>
  )
}
