import Chart from 'react-apexcharts'
import React from 'react'

export const Apex = ({labels,datapoints}) => {

    // const chart30Options = {
    //     chart: {
    //       toolbar: {
    //         show: false
    //       },
    //       sparkline: {
    //         enabled: true
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     colors: ['#3c44b1'],
    //     stroke: {
    //       color: '#4191ff',
    //       curve: 'smooth',
    //       width: 4
    //     },
    //     xaxis: {
    //       crosshairs: {
    //         width: 1
    //       }
    //     },
    //     yaxis: {
    //       min: 0
    //     },
    //     legend: {
    //       show: false
    //     }
    //   };
    //   const chart30Data = [
    //     {
    //       name: 'Customers',
    //       data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
    //     }
    //   ];
    
    const series = [
        {
          name: "آمار فروش ", //will be displayed on the y-axis
        //   data: [43, 53, 50, 57]
          data: datapoints
        }
      ];
      const options = {
   
        chart: {
          id: "simple-bar"
        },

        chart: {
            foreColor: '#194D33',
            toolbar: {
              show: false
            },
          },
          stroke: {
            width: 2
          },
          dataLabels: {
            enabled: false,
  
          },
         
          tooltip: {
              followCursor: false,
              theme: 'dark'
            },
          grid: {
            borderColor: "#535A6C",
            xaxis: {
              lines: {
                show: true
              }
            }
          },







        
        xaxis: {
          categories: labels //will be displayed on the x-asis
        //   categories: [1, 2, 3, 4] //will be displayed on the x-asis
        }
      };
      const chart31Options = {

            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        };
      const chart31Data = [
        {
          name: 'Sales',
          data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
        }
      ];
    

      const options2 = { labels: ["Comedy", "Action", "Romance", "Drama", "SciFi"] };
      const options3 = { 
        labels: ["Comedy", "Action", "Romance", "Drama", "SciFi"] ,
 
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
    };
      const series2 = [4, 5, 6, 1, 5]; 



    //   window.Apex = {
    //     chart: {
    //       foreColor: '#194D33',
    //       toolbar: {
    //         show: false
    //       },
    //     },
    //     stroke: {
    //       width: 1
    //     },
    //     dataLabels: {
    //       enabled: false,

    //     },
       
    //     tooltip: {
    //         followCursor: true,
    //         theme: 'dark'
    //       },
    //     grid: {
    //       borderColor: "#535A6C",
    //       xaxis: {
    //         lines: {
    //           show: true
    //         }
    //       }
    //     }
    //   };
      

const  optionsAreaseries= [{
    name: "Music",
    data: [11, 15, 26, 20, 33, 27]
  },
  {
    name: "Photos",
    data: [32, 33, 21, 42, 19, 32]
  },
  {
    name: "Files",
    data: [20, 39, 52, 11, 29, 43]
  }
]
      const optionsArea = {
        chart: {
          height: 380,
          type: 'area',
          stacked: false,
        },
        stroke: {
            curve: 'straight'
        },
       
        xaxis: {
          categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
        },
        tooltip: {
          followCursor: true
        },
        fill: {
          opacity: 1,
        },
      
    }



  return (
    <div>
        <Chart options={options} series={series} type="line" width="480" />
      
    {/*
       <div className="pt-4 pr-4 pl-4">
    <Chart
        options={chart30Options}
        series={chart30Data}
        type="donut"
        height={100}
      />
    </div> */}
     {/* <div className="donut">
    <Chart options={options} series={series} type="line" width="380" />
  </div>
  <Chart options={options3} series={series2} type="donut" width="380" />
  <div className="donut">
    <Chart options={options2} series={series2} type="pie" width="380" />
    dounut
    <Chart options={options3} series={series2} type="donut" width="380" />
    <Chart options={optionsArea} series={optionsAreaseries} type="area" width="380" />
  </div>

    <div className="pt-4 pr-4 pl-4">
                <Chart
                  options={chart31Options}
                  series={chart31Data}
                  type="line"
                  height={100}
                />
              </div> */}



  </div>
  )
}
