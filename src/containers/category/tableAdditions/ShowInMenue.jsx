import React from 'react'

export const ShowInMenue = ({item}) => {
    return(<span className={item?"text-success":"text-danger"} >{item?"هست":"نیست"}</span>)
}

