import React from 'react';
import DiscounTstable from './DiscountsTable';


const Discounts = () => {
    return (
        <div id="manage_discount_section" className="manage_discount_section main_section">
        <h4 className="text-center my-3">مدیریت کد های تخفیف</h4>          
             <DiscounTstable/>
    </div>

    );
}

export default Discounts;
