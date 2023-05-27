
import React from 'react'
export const ShowInfilter = ({item}) => {
    return(<span className={item.in_filter?"text-success":"text-danger"} >{item.in_filter?"هست":"نیست"}</span>)
}