// import React, { useEffect, useState } from "react";
// import ModalContainer from "../../components/ModalContainer";
// import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
// import { Form, Formik } from "formik";
// import FormikControl from "../../components/form/FormikControl";
// import { initialValues, onSubmit, validationSchema } from "./core";
// import { SubmittingButton } from "../../components/SubmittingButton";
// import { PrevPageButton } from "../../components/PrevPageButton";
// import { getOneUserService } from "../../services/users";
// import { getAllRoles } from "../../services/user";

// const AddUser = () => {
//   const navigation = useNavigate();
//   const location = useLocation();
//   const selectedUserId = location?.state?.selectedUserId;
//   const { setData } = useOutletContext();
//   const [reInitialValues, setReInitialValues] = useState(null);
// const [selectedUser, setSelectedUser] = useState()
//   const [selectedRoles, setSelectedRoles] = useState([])
//   const [allRole, setAllRole] = useState([])
//   useEffect(() => {
//     handelGetAllRole()
//      if(selectedUserId)
//     getSelectedUser()

//   }, [selectedUserId])

// const getSelectedUser=async()=>{
//   const res=await getOneUserService(selectedUserId)
//  if(res.status===200){
//   setSelectedUser(res.data.data)
//     console.log(res.data.data)
//  console.log("userToEdit:",selectedUser)
// }
// }
// const handelGetAllRole=async()=>{
//   const res=await getAllRoles()
//   if(res.status==200)
//   setAllRole(res.data.data.map(i=>{return  {id:i.id,value:i.title}}))

// }

//   return (
//     <>
//       <ModalContainer
//         className="show d-block"
//         id={"add_user_modal"}
//         title={"افزودن کاربر"}
//         fullScreen={true}
//         closeFunction={() => {
//           navigation(-1);
//         }}
//       >
//         <div className="">
//           <div className="row justify-content-center">
//             <Formik
//              initialValues={reInitialValues || initialValues}
//              onSubmit={(values, actions)=>onSubmit(values, actions, setData,selectedUserId )}
//              validationSchema={validationSchema}
//              enableReinitialize
//             >
//               {(formik) => {
//                 return (
//                   <Form>
//                     <FormikControl
//                       label="نام کاربری"
//                       className="col-md-6 col-lg-8"
//                       control="input"
//                       type="text"
//                       name="user_name"
//                       placeholder="نام کاربری"
//                     />
//                     <FormikControl
//                       label="نام "
//                       className="col-md-6 col-lg-8"
//                       control="input"
//                       type="text"
//                       name="first_name"
//                       placeholder="نام "
//                     />
//                     <FormikControl
//                       label="نام خانوادگی "
//                       className="col-md-6 col-lg-8"
//                       control="input"
//                       type="text"
//                       name="last_name"
//                       placeholder="نام خانوادگی"
//                     />
//                     <FormikControl
//                       label="شماره همراه "
//                       className="col-md-6 col-lg-8"
//                       control="input"
//                       type="text"
//                       name="phone"
//                       placeholder="شماره همراه"
//                     />
//                     <FormikControl
//                       label="ایمیل"
//                       className="col-md-6 col-lg-8"
//                       control="input"
//                       type="text"
//                       name="email"
//                       placeholder="فقط فرمت ایمیل (email@yourhost.com)"
//                     />

//                     <FormikControl
//                       label="پسوورد"
//                       className="col-md-6 col-lg-8"
//                       control="password"
//                       type="text"
//                       name="password"
//                       placeholder="******"
//                     />

//                     <FormikControl
//                       control="date"
//                       className="col-md-6 col-lg-8"
//                       name="birth_date"
//                       label="تاریخ تولد"
//                       formik={formik}
//                       yearsLimit={{ from: 100, to: 0 }}
//                       initialDate={undefined}
//                     />

//                     <FormikControl
//                       className="col-md-6 col-lg-8"
//                       control="radio"
//                       name="gender"
//                       label="جنسیت"
//                       formik={formik}
//                       options={[
//                         { id: 0, value: "زن" },
//                         { id: 1, value: "مرد" },
//                       ]}
//                     />

// <FormikControl
//   label="نقش ها"
//   resultType="array"
//   className="col-md-6 col-lg-8"
//   control="filterselect"
//   options={typeof allRole=="object"?allRole:[]}
//   name="roles_id"
//   firstItem="لطفا نقش های مورد نظر خود را انتخاب نمایید"
//   initialItems={[]}
// />
//                     <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
//                       <SubmittingButton tittle="ذخیره" />
//                       <PrevPageButton />
//                     </div>
//                   </Form>
//                 );
//               }}
//             </Formik>
//           </div>
//         </div>
//       </ModalContainer>
//     </>
//   );
// };

// export default AddUser;
import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { SubmittingButton } from "../../components/SubmittingButton";
import { getOneUserService } from "../../services/users";
import { getAllRoles } from "../../services/user";
import { initialValues, onSubmit, validationSchema } from "./core";
import { convertDateToJalali } from "../../layouts/admin/utils/ConvertDate";
const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedUserId = location.state?.selectedUserId;
  const { setData } = useOutletContext();

  const [userToEdit, setUserToEdit] = useState(null);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);

  const handleGetAllRoles = async () => {
    const res = await getAllRoles();
    if (res.status === 200) {
      setAllRoles(
        res.data.data.map((r) => {
          return { id: r.id, value: r.title };
        })
      );
    }
  };

  const handleGetUserData = async () => {
   
    const res = await getOneUserService(selectedUserId);
    if (res.status === 200) {
      setUserToEdit(res.data.data);
    }
  };

  useEffect(() => {
    handleGetAllRoles();
    if (selectedUserId) {
      handleGetUserData();
    }
  }, []);

  useEffect(() => {
    
    if (userToEdit) {
      setSelectedRoles(
        userToEdit.roles.map((r) => {
          return { id: r.id, value: r.title };
        })
      );
      const roles_id = userToEdit.roles.map((p) => p.id);
      setReInitialValues({
        birth_date: userToEdit.birth_date ? convertDateToJalali(userToEdit.birth_date, 'jD / jM / jYYYY') : "",
        roles_id,
        password: "",
        user_name: userToEdit.user_name || "",
        first_name: userToEdit.first_name || "",
        last_name: userToEdit.last_name || "",
        phone: userToEdit.phone || "",
        email: userToEdit.email || "",
        gender: userToEdit.gender,
        isEditing:true,
      });
    }
  }, [userToEdit]);

  return (
    <ModalContainer
      className="show d-block"
      id={"add_user_modal"}
      title={"افزودن کاربر"}
      fullScreen={true}
      closeFunction={() => navigate(-1)}
    >
      <div className="container">
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setData, selectedUserId,setSelectedRoles,setUserToEdit)
          }
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="row justify-content-center">
                <div className="row justify-content-center">
                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="user_name"
                    label="نام کاربری"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="first_name"
                    label="نام "
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />
                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="last_name"
                    label="نام خانوادگی"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="number"
                    name="phone"
                    label="شماره موبایل"
                    placeholder="فقط از اعداد استفاده کنید"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="email"
                    label="ایمیل"
                    placeholder="فقط فرمت ایمیل (email@yourhost.com)"
                  />

                  <FormikControl
                    className={"col-md-8"}
                    control="input"
                    type="text"
                    name="password"
                    label="کلمه عبور"
                    placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                  />

                  <FormikControl
                    className="col-md-8"
                    control="date"
                    formik={formik}
                    name="birth_date"
                    label="تاریخ تولد"
                    initialDate={userToEdit ? userToEdit.birth_date : undefined}
                    yearsLimit={{ from: 100, to: -10 }}
                  />

                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="radio"
                    name="gender"
                    label="جنسیت"
                    formik={formik}
                    options={[
                      { id: 0, value: "خانم" },
                      { id: 1, value: "مرد" },
                    ]}
                  />

                  <FormikControl
                    label="نقش ها"
                    resultType="array"
                    className="col-md-6 col-lg-8"
                    control="filterselect"
                    options={typeof allRoles == "object" ? allRoles : []}
                    name="roles_id"
                    firstItem="لطفا نقش های مورد نظر خود را انتخاب نمایید"
                    initialItems={selectedRoles}
                  />
                  <div className="btn_box text-center col-12 mt-4">
                    <SubmittingButton tittle="ذخیره" />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalContainer>
  );
};

export default AddUser;
