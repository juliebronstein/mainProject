import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthFormikControl from "../../components/autForm/AuthFromikControl";
import { Alert } from "../../layouts/admin/utils/alert";
import { loginService } from "../../services/auth";
import loginImg from "../utilis/images/img-01.png"
const initialValues = {
  phone: "",
  password: "",
  remember: false,
};
const onSubmit = async (values, submitMethods, navigate) => {
  try {
    const result = await loginService(values);
    if (result.status === 200) {
      localStorage.setItem("loginToken", JSON.stringify(result.data));
      navigate("/");
    } else {
      Alert("...!", result.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    Alert("...!", "متاسفانه مشکلی از سمت سرور رخ داده است", "warning");
  }
};
const validationSchema = Yup.object({
  phone: Yup.number().required("لطفا این قسمت را پر کنید"),
  password: Yup.string().required("لطفا این قسمت را پر کنید"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "حد اقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید"
  // ),
  remember: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        //console.log(formik);
        return (
          <div className="wrap-login100">
            <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
              <span className="login100-form-title">ورود اعضا</span>

              <AuthFormikControl
                formik={formik}
                control="input"
                type="text"
                name="phone"
                icon="fa fa-mobile"
                label="شماره موبایل"
              />

              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                icon="fa fa-lock"
                label="رمز عبور"
              />

              <AuthFormikControl
                formik={formik}
                control="switch"
                name="remember"
                label="مرا به خاطر بسپار"
              />

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  {formik.isSubmitting ? " لطفا صبر کنید" : "ورود"}
                </button>
              </div>
            </Form>
            <div className="login100-pic js-tilt" data-tilt>
              <img src={loginImg} alt="IMG" />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
