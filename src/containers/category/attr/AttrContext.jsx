import React, { useState } from 'react'
import { createContext } from "react";


export const ArrtibutesContex=createContext({
    editeItem:null,
    setEditeItem:()=>{}
})

export const ArrtibutesContexContainer = ({children}) => {
    const [editeItem, setEditeItem] = useState(null)
  return (
    <ArrtibutesContex.Provider value={{
      editeItem,
      setEditeItem
    }}>
        {children}
    </ArrtibutesContex.Provider>
  )
}
