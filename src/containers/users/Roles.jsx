import React from 'react'

export const Roles = ({item}) => {return(<>
    {item.roles?.map(i=>(
      <div key={i.id+"/"+item.id} className="text-center">{i.title}</div>
    ))}
    </>)}
