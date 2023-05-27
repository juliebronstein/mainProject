import React from "react";

export const Avatar = ({ name, imgPath }) => {
  return (
    <div className="pt-1 pb-2 d-flex flex-column avatar_li position-relative mb-2 sideber-item">
      <span className="avatar_box">
        <img
          className="w-100 rounded-circle"
          src={imgPath}
          alt="The network connection is poor"
        />
      </span>
      <div className="sidebar_avatar_name text-center hiddenable">{name}</div>
    </div>
  );
};
