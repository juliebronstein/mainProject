import React from 'react'
import { TableProduct } from './TableProduct'
import { StockContexContainer } from '../../context/stockContex'

export const Product = () => {
  return (
    <StockContexContainer>

    <div id="manage_product_section" className="manage_product_section main_section">
        <h4 className="text-center my-3">مدیریت محصولات</h4>
      

<TableProduct/>

    </div>

    </StockContexContainer>

  )
}
