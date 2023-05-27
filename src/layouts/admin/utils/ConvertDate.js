import React from 'react'
import jMoment from 'jalali-moment'
const ConvertDate = ({item}) => {

  return (
    <>{jMoment(item).format('jYYYY/jMM/jDD')} </>
     

  )
}

export default ConvertDate