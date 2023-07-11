import React, { useEffect, useState } from 'react'
import { Card } from './Card'
import { getOrderStatisticsService } from '../../services/orders'
const cardObjects=[
    {
        key:1,
        name:"carts",
        icon:"fas fa-shopping-basket",
        curentValue:"",
          title:"سبد خرید امروز",
          desc:"سبد های خرید مانده امروز",
          lastWeekValue:"",
          lastMonthValue:"",
    },

    {
        key:2,
        name:"pendingOrders",
        icon:"fas fa-dolly",
        curentValue:"",
        title:"سفارشات مانده امروز",
        desc:"سفارشات معلق و فاقد پرداختی ",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:3,
        name:"successOrders",
        icon:"fas fa-dolly",
          curentValue:"",
          title:"سفارشات امروز",
          desc:"سفارشات کامل و دارای پرداخت",
          lastWeekValue:"",
          lastMonthValue:"",
    },
    {
        key:4,
        name:"successOrdersAmount",
        icon:"fas fa-dolly",
        curentValue:"",
        title:"درآمد امروز",
        desc:"جمع مبالغ پرداختی (تومان)",
        lastWeekValue:"",//<
        lastMonthValue:"",
    },
]

export default function Cards() {
    const [loading, setLoading] = useState(false)
    const [cardInfos, setCardInfos] = useState(cardObjects)
    const handelCartsInfo=async()=>{
        setLoading(true)
        try{
             const res=await getOrderStatisticsService()
             if(res.status===200){
                const data=res.data.data
                const newCardsInfo=[...cardInfos]
                for(const key in data){
                    const index=newCardsInfo.findIndex(i=>i.name===key)
                    newCardsInfo[index].curentValue=data[key].today
                    newCardsInfo[index].lastWeekValue=data[key].thisWeek
                    newCardsInfo[index].lastMonthValue=data[key].thisMonth
                }
               setLoading(false)
               setCardInfos(newCardsInfo)
             }

        }catch(err){console.log(err)}
      
    }
    useEffect(() => {
        handelCartsInfo()
    }, [])
    
  return (
      <div className="row">
        {loading?"":cardInfos.map(cartInfo=>(
            <Card {...cartInfo}/>
        )) }
      </div>
  )
}
