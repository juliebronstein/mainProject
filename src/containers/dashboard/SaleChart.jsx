import React, { useEffect, useState } from 'react'
import { destroyChart, setDashboardChart } from '../../layouts/admin/utils/DashboardChart';
import { getThisYearOrdersService } from '../../services/orders';
import jMoment from 'jalali-moment'

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const SaleChart = () => {
    const [loading, setLoading] = useState(false)
  const [datapoints, setDatapoints] = useState([]);
  const handelGetChartInfo=async()=>{
    setLoading(true)
    const res = await getThisYearOrdersService()
    setLoading(false)
    if (res.status === 200) {

      const monthsOrdersArr = []
      const now = jMoment()
      let  thisMonth = now.jMonth();
      for (let i = 0; i < 12; i++) {
        if(thisMonth === -1) thisMonth = 11
        monthsOrdersArr.push({month:thisMonth, amount: 0})
        thisMonth --
      }
      console.log("monthsOrdersArr",monthsOrdersArr)

      const orders = res.data.data
      for (const order of orders) {
        console.log("jMoment(order.pay_at)",jMoment(order.pay_at))
        const moment = jMoment(order.pay_at)
        const monthIndex = moment?.jMonth()
        const index = monthsOrdersArr.findIndex(o=>o.month == monthIndex)
        monthsOrdersArr[index].amount = monthsOrdersArr[index].amount + parseInt(order?.pay_amount)
      }

      monthsOrdersArr.reverse()
      setDashboardChart(monthsOrdersArr.map(o=>labels[o.month]), monthsOrdersArr.map(o=>o.amount/1000000));
    }
  }
    useEffect(() => {
       
        // const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        handelGetChartInfo()
        // setDashboardChart(labels, datapoints);
       
      }, []); 

  return (
       <div id="canvans" className="col-12 col-lg-6">
          {/* <Apex labels={labels} datapoints={datapoints} /> */}
          <canvas id="myChart" height="195"></canvas>
        </div>
  )
}
