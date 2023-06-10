import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../context/AdminLayoutContext";
import { Logout } from "./auth/Logout";
import { Category } from "./category/Category";
import Attributes from "./category/attr/Attributes";
import { CategoryChildren } from "./category/CategoryChildren";
import { Dashboard } from "./dashboard/Dashboard";
import { Product } from "./Product/Product";
import Colors from "./colors/Colors";
import Brands from "./brands/Brands";
import Carts from "./carts/Carts";
import Guaranties from "./guaranties/Guaranties";
import Users from "./users/Users";
import { AddProduct } from "./Product/AddProduct";
import SetAttribute from "./Product/setAttr/SetAttribute";
import { Gallery } from "./Product/gallery/Gallery";
import Discounts from "./discounts/Discounts";
import AddDiscount from "./discounts/AddDiscount";
import Roles from "./rols/Roles";

export const Content = () => {
  const { showsibbar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showsibbar ? "with_sidebar" : null}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Category />}>
          <Route path=":categoryId" element={<CategoryChildren />} />
        </Route>
        <Route
          path="/category/:categoryId/attributes"
          element={<Attributes />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/add-product" element={<AddProduct />} />
        <Route path="/product/set-attr" element={<SetAttribute />} />
        <Route path="/product/gallery" element={<Gallery />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/carts" element={<Carts />} />
        <Route path='/guaranties' element={<Guaranties/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/discounts' element={<Discounts/> }>
        <Route path='/discounts/add-discount' element={<AddDiscount/> }/>
        </Route>
        <Route path='/roles' element={<Roles/>}/>
        {/*
            <Route path='/discounts' element={<Discounts/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/deliveries' element={<Deliveries/>}/>
         
          
            <Route path='/permissions' element={<Permissions/>}/>
            <Route path='/questions' element={<Questions/>}/>
            <Route path='/comments' element={<Comments/>}/> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};
