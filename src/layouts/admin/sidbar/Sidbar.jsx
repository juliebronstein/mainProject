import React, { useContext } from "react";
import { AdminContext } from "../../../context/AdminLayoutContext";
import { Avatar } from "./Avatar";
import { SideBarGroupTitle } from "./SideBarGroupTitle";
import { SidebarItem } from "./SidebarItem";
import { useSelector } from "react-redux";

export const Sidbar = () => {
  const { showsibbar } = useContext(AdminContext);
  const user=useSelector(state=>state.userReduce.user)
const ulr='/assets/images/avatar/'
const urlImage=user.gender?ulr+"man.jpg":ulr+"woman.jpg"
  return (
    <section id="sidebar_section">
      <div
        className={` mini_sidebar collapsedd bg-dark h-100 ${
          showsibbar ? " expanded" : null
        }`}
      >
        <div className="p-0 m-0">
          <Avatar imgPath={user.image||urlImage } name={user.full_name} />
          <SidebarItem clsN="active"icon="fas fa-tachometer-alt" title="داشبورد" target="/" />
          <SideBarGroupTitle title="فروشگاه" />

          <SidebarItem icon="fas fa-stream" title="مدیریت گروه محصول" target="/category" />
          <SidebarItem icon="fas fa-cube" title="مدیریت محصول" target='/product' />
          <SidebarItem target="/brands" icon="fas fa-copyright"  title="مدیریت برندها"/>
          <SidebarItem target="/guaranties" icon="fab fa-pagelines" title="مدیریت گارانتی ها"/>
          <SidebarItem target="/colors" icon="fas fa-palette"  title="مدیریت رنگ ها"/>
          <SidebarItem target="/discounts" icon="fas fa-percentage" title="مدیریت تخفیف ها"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="سفارشات و سبد"/>
          <SidebarItem targetPath="/carts" icon="fas fa-shopping-basket" title="مدیریت سبد ها"/>
          <SidebarItem targetPath="/orders" icon="fas fa-luggage-cart" title="مدیریت سفارشات"/>
          <SidebarItem targetPath="/deliveries" icon="fas fa-truck-loading" title="مدیریت نحوه ارسال"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="کاربران و همکاران"/>
          <SidebarItem target="/users" icon="fas fa-users" title="مشاهده کاربران"/>
          <SidebarItem target="/roles" icon="fas fa-user-tag" title="نقش ها"/>
          <SidebarItem target="/permissions" icon="fas fa-shield-alt" title="مجوز ها"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="ارتباطات"/>
          <SidebarItem targetPath="/questions" icon="fas fa-question-circle" title="سوال ها"/>
          <SidebarItem targetPath="/comments" icon="fas fa-comment" title="نظرات"/>
       </div>
      </div>
    </section>
  );
};
