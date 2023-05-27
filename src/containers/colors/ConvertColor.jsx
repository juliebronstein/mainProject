import React from 'react'

export const ConvertColor = ({item}) => {
//   const mystyle = {
//     color: item.code? item.code:null,
//     backgroundColor: item.code? item.code:null,
//   };
// style={mystyle}
  return (
    
    <div className="w-100 h-100 d-block" style={{background:`${item.code?item.code:"null"}` ,color:`${item.code?item.code:"null"}`}}>...</div>
  )
}
