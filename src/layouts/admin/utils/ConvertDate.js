import jMoment from 'jalali-moment'
const ConvertDate = (date) => {
  return  jMoment(date.item).format('jYYYY/jMM/jDD')
  
}
export const ConvertDateToMiladi = (date) => {

  return  jMoment(date,'jD/jM/jYYYY').format('YYYY-M-D')
}
export const convertDateToJalali =(date, format)=>{
  return jMoment(date).format(format)
}


export default ConvertDate