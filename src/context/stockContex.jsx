import React, { useState } from 'react'
import { createContext } from "react";


export const StockContex=createContext({
    numctx:null,
    setNumctx:()=>{}
})

export const StockContexContainer = ({children}) => {
    const [numctx, setNumctx] = useState(3)
  return (
    <StockContex.Provider value={{
      numctx,
      setNumctx
    }}>
        {children}
    </StockContex.Provider>
  )
}
