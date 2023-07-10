import React, { useEffect } from 'react'
import { destroyChart, setDashboardChart } from '../../layouts/admin/utils/DashboardChart';

export const SaleChart = () => {
    
//   const [labels, setLabels] = useState([]);
//   const [datapoints, setDatapoints] = useState([]);
    useEffect(() => {
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
        const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        setDashboardChart(labels, datapoints);
        return ()=>{
          destroyChart() 
        }
      }, []); 
    
    //   useEffect(() => {
    //     setLabels([
    //       "فروردین",
    //       "اردیبهشت",
    //       "خرداد",
    //       "تیر",
    //       "مرداد",
    //       "شهریور",
    //       "مهر",
    //       "آبان",
    //       "آذر",
    //       "دی",
    //       "بهمن",
    //       "اسفند",
    //     ]);
    //     setDatapoints([0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170]);
    //     // setDashboardChart(labels,datapoints)
    //   }, []);
  return (
       <div id="canvans" className="col-12 col-lg-6">
          {/* <Apex labels={labels} datapoints={datapoints} /> */}
          <canvas id="myChart" height="195"></canvas>
        </div>
  )
}
