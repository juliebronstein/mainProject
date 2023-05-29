
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SetAttribute = () => {
    // const selectedProduct=useLocation()?.state.product
    const location=useLocation()
    const {selectedProduct}=location.state
    console.log(selectedProduct)
    const [attrs, setAttrs] = useState(selectedProduct.attributes)
    // setAttrs()
    console.log(attrs)
    return (
     
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-8">
                        <div className="input-group my-3 dir_ltr">
                            <span className="input-group-text w_6rem justify-content-center">عدد</span>
                            <input type="text" className="form-control" placeholder="" />
                            <span className="input-group-text w_8rem justify-content-center">ویژگی اول</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                        <div className="input-group my-3 dir_ltr">
                            <span className="input-group-text w_6rem justify-content-center">کیلو</span>
                            <input type="text" className="form-control" placeholder="" />
                            <span className="input-group-text w_8rem justify-content-center">ویژگی دوم</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                        <div className="input-group my-3 dir_ltr">
                            <span className="input-group-text w_6rem justify-content-center">مگاهرتز</span>
                            <input type="text" className="form-control" placeholder="" />
                            <span className="input-group-text w_8rem justify-content-center">ویژگی سوم</span>
                        </div>
                    </div>
                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                        <button className="btn btn-primary ">ذخیره</button>
                    </div>
                </div>
            </div>
    );
}

export default SetAttribute;