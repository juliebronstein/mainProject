import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon } from "../../components/ActionIcon";

export const Actions = ({ item, handelDeleteRole }) => {
  const navigate = useNavigate();
  return (
    <>
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_role"
        title="ویرایش نقش"
        onClick={() => {
          navigate("/roles/add-role", {
            state: { selectedRoleId: item.id, editeType: "role" },
          });
        }}
      ></ActionIcon>
      <ActionIcon
        icon="fas fa-fingerprint text-info"
        pTitle="update_role_permissions"
        title="دسترسی ها"
        onClick={() => {
          navigate("/roles/add-role", {
            state: { selectedRoleId: item.id, editeType: "permissions" },
          });
        }}
      ></ActionIcon>

      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="update_role_permissions"
        title="حذف نفش"
        onClick={() => handelDeleteRole(item)}
      ></ActionIcon>
    </>
  );
};
