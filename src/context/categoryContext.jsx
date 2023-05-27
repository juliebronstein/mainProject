import React, { useState } from 'react'
import { createContext } from "react";


export const CategoryContex=createContext({
    editeId:null,
    setEditeId:()=>{}
})

export const CategoryContexContainer = ({children}) => {
    const [editeId, setEditeId] = useState(null)
  return (
    <CategoryContex.Provider value={{
        editeId,
        setEditeId
    }}>
        {children}
    </CategoryContex.Provider>
  )
}
