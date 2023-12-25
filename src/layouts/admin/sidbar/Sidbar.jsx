import React, { useContext } from "react";
import { AdminContext } from "../../../context/AdminLayoutContext";
import { Avatar } from "./Avatar";
import { SideBarGroupTitle } from "./SideBarGroupTitle";
import { SidebarItem } from "./SidebarItem";
import { useSelector } from "react-redux";
import man from './avatar/man.jpg' 
import woman from './avatar/woman.jpg' 

export const Sidbar = () => {
  const { showsibbar } = useContext(AdminContext);
  const user=useSelector(state=>state.userReduce.user)
const ulr='./avatar/'
const urlImage=user.gender?man:woman
  return (
    <section id="sidebar_section">
      <div
        className={` mini_sidebar collapsedd bg-dark h-100 ${
          showsibbar ? " expanded" : null
        }`}
      >
        <div className="p-0 m-0">
          <Avatar imgPath={user.image||urlImage } name={user.full_name} />
          <SidebarItem clsN="active"icon="fas fa-tachometer-alt" title="داشبورد" target="/" pTitle="read_" />
          <SideBarGroupTitle title="فروشگاه"  pTitle={["read_categories","read_products","read_brands","read_guarantees","read_colors","read_discounts"]} />

          <SidebarItem icon="fas fa-stream" title="مدیریت گروه محصول" target="/category"  pTitle="read_categories"/>
          <SidebarItem icon="fas fa-cube" title="مدیریت محصول" target='/product'  pTitle="read_products"/>
          <SidebarItem target="/brands" icon="fas fa-copyright"  title="مدیریت برندها" pTitle="read_brands"/>
          <SidebarItem target="/guaranties" icon="fab fa-pagelines" title="مدیریت گارانتی ها" pTitle="read_guarantees"/>
          <SidebarItem target="/colors" icon="fas fa-palette"  title="مدیریت رنگ ها" pTitle="read_colors"/>
          <SidebarItem target="/discounts" icon="fas fa-percentage" title="مدیریت تخفیف ها" pTitle="read_discounts"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="سفارشات و سبد" pTitle={["read_cards","read_orders","read_deliveries"]} />
          <SidebarItem target="/carts" icon="fas fa-shopping-basket" title="مدیریت سبد ها" pTitle="read_cards"/>
          <SidebarItem target="/orders" icon="fas fa-luggage-cart" title="مدیریت سفارشات" pTitle="read_orders"/>
          <SidebarItem target="/deliveries" icon="fas fa-truck-loading" title="مدیریت نحوه ارسال" pTitle="read_deliveries"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="کاربران و همکاران" pTitle={["read_users","read_roles","read_permissions"]} />
          <SidebarItem target="/users" icon="fas fa-users" title="مشاهده کاربران" pTitle="read_users"/>
          <SidebarItem target="/roles" icon="fas fa-user-tag" title="نقش ها" pTitle="read_roles"/>
          <SidebarItem target="/permissions" icon="fas fa-shield-alt" title="مجوز ها" pTitle="read_permissions"/>
          {/* <!-- =================================== --> */}
          <SideBarGroupTitle title="ارتباطات" pTitle={["read_question","read_comments"]} />
          <SidebarItem targetPath="/questions" icon="fas fa-question-circle" title="سوال ها" pTitle="read_question"/>
          <SidebarItem targetPath="/comments" icon="fas fa-comment" title="نظرات" pTitle="read_comments"/>
       </div>
      </div>
    </section>
  );
};
