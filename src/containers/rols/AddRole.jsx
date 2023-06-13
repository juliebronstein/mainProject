import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import FormikControl from "../../components/form/FormikControl";
import { Form, Formik } from "formik";
import { SubmittingButton } from "../../components/SubmittingButton";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getAllPermissions, getSinglrRoleService } from "../../services/user";

const AddRole = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { setData } = useOutletContext();
  const selectedRoleId = location.state?.selectedRoleId;
  const editeType = location.state?.editeType;
  const [roleToEdite, setRoleToEdite] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);
  const [permision, setPermision] = useState([]);
  const getAllPermission = async () => {
    try {
      const res = await getAllPermissions();
      if (res.status == 200)
        setPermision(
          res.data.data.map((i) => {
            return { id: i.id, title: i.description };
          })
        );
    } catch (err) {}
  };

  const handelGetRoleToEdite = async () => {
    // if (selectedRoleId) {
      const res = await getSinglrRoleService(selectedRoleId);
      if (res.status === 200) {
        const role = res.data.data;
        setRoleToEdite(role)
        // console.log("role:",role)
        editeType==="role"? 
         setReInitialValues({
          title: role.title,
          description: role.description,
        }) :setReInitialValues({
          permissions_id:role.permissions.map(i=>""+i.id),
          editPermissions:true
        })
      }
    // }
  };

  useEffect(() => {
    editeType !== "role" && getAllPermission();
    selectedRoleId && handelGetRoleToEdite();
  }, []);

  return (
    <ModalContainer
      className="show d-block"
      id={"add_role_modal"}
      fullScreen={
        editeType !== "permission" ? true : false}
      title={editeType==="role"? <>ویرایش نقش:{" "}<span className="text-primary">{roleToEdite?.title}</span></>
    :editeType==="permissions"? <>ویرایش مجوزهای دسترسی:{" "}<span className="text-primary">{roleToEdite?.title}</span></>
    :"افزودن نقش"
    }
      closeFunction={() => {
        navigation(-1);
      }}
    >
      <div className="row justify-content-center">
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={(values, actions) => onSubmit(values, actions, setData,selectedRoleId,editeType)}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                {editeType !== "permissions" ? (
                  <>
                    <FormikControl
                      label="عنوان نقش"
                      className={editeType === "role" ? "" : "col-12"}
                      control="input"
                      type="text"
                      name="title"
                      placeholder="عنوان نقش"
                    />
                    <FormikControl
                      label="توضیحات نقش"
                      className={editeType === "role" ? "" : "col-12"}
                      control="textarea"
                      name="description"
                      placeholder="توضیحات نقش"
                    />
                  </>
                ) : null}

                {editeType !== "role" ? (
                  <FormikControl
                    className={editeType === "role" ? "" : "col-12"}
                    control="checkbox"
                    name="permissions_id"
                    label="دسترسی ها: "
                    options={permision}
                  />
                ) : null}

                <SubmittingButton tittle="ذخیره" />
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalContainer>
  );
};

export default AddRole;
