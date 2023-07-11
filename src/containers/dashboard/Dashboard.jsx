import React from "react";
import { SaleChart } from "./SaleChart";
import ProductTable from "./productTable";
import Cards from "./Cards";
export const Dashboard = () => {
  
  return (
    <div id="dashboard_section" className="dashboard_section main_section">
    <Cards/>

      <div className="row">
        <ProductTable/>
<SaleChart/>
    
      </div>
    </div>
  );
};
