import React from "react";
import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const SidebarItem = ({ title, icon,target }) => {

  return (

    <NavLink to={target} className="py-1 text-start pe-4 sidebar_menu_item sideber-item" href="/#" >
          <i className={`ms-3 icon text-light ${icon}`}></i>
          <span className="hiddenable no_wrap font_08">{title}</span>{" "}
    </NavLink>

  );
};
