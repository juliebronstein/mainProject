import React, { useEffect, useState } from 'react'
import { Card } from './Card';
import { Apex } from '../../layouts/admin/utils/Apex';

export const Dashboard = () => {
    const [labels, setLabels] = useState([]);
    const [datapoints, setDatapoints] = useState([]);
    useEffect(() => {
        setLabels(['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' , 'مهر' , 'آبان' , 'آذر' ,'دی' , 'بهمن' , 'اسفند'])
        setDatapoints([0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170])
        // setDashboardChart(labels,datapoints)
        
    }, []);
  return (

    <div id="dashboard_section" className="dashboard_section main_section">

        <div className="row">

        
            <Card 
            icon="fas fa-shopping-basket" 
            curentValue="7" 
            title="سبد خرید امروز" 
            desc="سبد های خرید مانده امروز"  
            lastWeekValue="13" 
            lastMonthValue="18"/>
            <Card 
            icon="fas fa-dolly" 
            curentValue="5" 
            title="سفارشات مانده امروز" 
            desc="سفارشات معلق و فاقد پرداختی "
            lastWeekValue="9" 
            lastMonthValue="16"/>

            
            <Card 
            icon="fas fa-dolly" 
            curentValue="45" 
            title="سفارشات امروز" 
            desc="سفارشات کامل و دارای پرداخت"
            lastWeekValue="263" 
            lastMonthValue="1038"/>
            <Card 
            icon="fas fa-dolly" 
            curentValue="1,500,000" 
            title="درآمد امروز" 
            desc="جمع مبالغ پرداختی (تومان)"
            lastWeekValue="6,380,000<" 
            lastMonthValue="22,480,000"/>
           
        </div>







        <div className="row">

            <div className="col-12 col-lg-6">

                <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>

                <table className="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
                    <thead className="table-secondary">
                        <tr>
                            <th>#</th>
                            <th>دسته</th>
                            <th>عنوان</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>دسته شماره فلان</td>
                            <td>محصول فلان</td>
                            <td>پایان یافته</td>
                            <td>
                                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>دسته شماره فلان</td>
                            <td>محصول فلان</td>
                            <td>رو به اتمام - 4</td>
                            <td>
                                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>دسته شماره فلان</td>
                            <td>محصول فلان</td>
                            <td>پایان یافته</td>
                            <td>
                                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>دسته شماره فلان</td>
                            <td>محصول فلان</td>
                            <td>پایان یافته</td>
                            <td>
                                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>دسته شماره فلان</td>
                            <td>محصول فلان</td>
                            <td>رو به اتمام - 2</td>
                            <td>
                                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>

            
            <div id="canvans" className="col-12 col-lg-6">
            <Apex labels={labels} datapoints={datapoints} />
            {/* <canvas id="myChart" height="195"></canvas> */}
            </div>

        </div>










    </div>

    
  )
}
