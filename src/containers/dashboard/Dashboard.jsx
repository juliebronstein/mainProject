import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { SaleChart } from "./SaleChart";
import ProductTable from "./productTable";
export const Dashboard = () => {
  
  return (
    <div id="dashboard_section" className="dashboard_section main_section">
      <div className="row">
        <Card
          icon="fas fa-shopping-basket"
          curentValue="7"
          title="سبد خرید امروز"
          desc="سبد های خرید مانده امروز"
          lastWeekValue="13"
          lastMonthValue="18"
        />
        <Card
          icon="fas fa-dolly"
          curentValue="5"
          title="سفارشات مانده امروز"
          desc="سفارشات معلق و فاقد پرداختی "
          lastWeekValue="9"
          lastMonthValue="16"
        />

        <Card
          icon="fas fa-dolly"
          curentValue="45"
          title="سفارشات امروز"
          desc="سفارشات کامل و دارای پرداخت"
          lastWeekValue="263"
          lastMonthValue="1038"
        />
        <Card
          icon="fas fa-dolly"
          curentValue="1,500,000"
          title="درآمد امروز"
          desc="جمع مبالغ پرداختی (تومان)"
          lastWeekValue="6,380,000<"
          lastMonthValue="22,480,000"
        />
      </div>

      <div className="row">
        <ProductTable/>
<SaleChart/>
    
      </div>
    </div>
  );
};
