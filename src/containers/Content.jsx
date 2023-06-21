import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AddRole from "./rols/AddRole";
import AddUser from "./users/AddUser";
import Permissions from "./permissions/Permissions";
import PermComponent from "../components/form/PermComponent";
import { useHasPermission } from "../hook/permissiondHook";

export const Content = () => {
  const { showsibbar } = useContext(AdminContext);
  const hasCategoryPermission = useHasPermission("read_categories")
  const hasDiscountPermission = useHasPermission("read_discounts")
  const hasUserPermission = useHasPermission("read_users")
  const hasRolePermission = useHasPermission("read_roles")

  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showsibbar ? "with_sidebar" : null}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {hasCategoryPermission && (<Route path="/category" element={<Category />}>
          <Route path=":categoryId" element={<CategoryChildren />} />
          </Route>
        ) }

        <Route path="/category/:categoryId/attributes" element={<PermComponent component={<Attributes/>} pTitle="read_category_attrs" />} />
        <Route path="/product"element={<PermComponent component={<Product/>} pTitle="read_products" />} />
        <Route path="/product/add-product" element={<PermComponent component={<AddProduct />} pTitle="create_product"/>} />
        <Route path="/product/set-attr" element={<PermComponent component={<SetAttribute />} pTitle="create_product_attr"/>} />
        <Route path="/product/gallery" element={<PermComponent component={<Gallery/>} pTitle="create_product_image"/>}  />
        <Route path="/colors" element={<PermComponent component={<Colors/>} pTitle="read_colors"/>} />
        <Route path="/brands" element={<PermComponent component={<Brands/>} pTitle="read_brands"/>} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/guaranties" element={<PermComponent component={<Guaranties/>} pTitle="read_cards"/> }/>
        {hasUserPermission&&(
          <Route path="/users" element={<Users/>}>
          <Route path="add-user" element={<AddUser />} />
        </Route>
        )}
        {hasDiscountPermission&&(
           <Route path="/discounts" element={<Discounts />}>
          <Route path="add-discount" element={<AddDiscount />} />
        </Route>
        )}
       {hasRolePermission&&(
         <Route path="/roles" element={<Roles />}>
          <Route path="add-role" element={<AddRole />} />
        </Route>
       )}
       
        <Route path="/permissions" element={<PermComponent component={<Permissions />}pTitle="read_permissions"/> } />
        {/*
            <Route path='/discounts' element={<Discounts/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/deliveries' element={<Deliveries/>}/>
         
          
            <Route path='/questions' element={<Questions/>}/>
            <Route path='/comments' element={<Comments/>}/> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};
