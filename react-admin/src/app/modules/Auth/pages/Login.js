import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { useHistory } from "react-router-dom";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  // email: "admin@demo.com",
  // password: "demo",
  username: "balwinder",
  password: "balwinder",
};

function Login(props) {
  const history = useHistory();
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then(({ data }) => {
            if (data.success == false) {
              setStatus(data.msg);
              disableLoading();
            } else {
              props.login(data.token);
              history.push("/");
            }
            //disableLoading();
          })
          .catch((err) => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              // intl.formatMessage({
              //     id: "AUTH.VALIDATION.INVALID_LOGIN",
              // })
              "API problem"
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="pb-13 pt-lg-0 pt-5">
        <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        {/* <span className="text-muted font-weight-bold font-size-h4">New Here?
          <a href="/auth/registration" id="kt_login_signup" className="text-primary"> Create an Account</a></span> */}
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <label className="font-size-h6 text-dark">UserName</label>
          <input
            placeholder="UserName"
            className={`form-control h-auto py-7 px-6 rounded-lg border-0 ${getInputClasses(
              "username"
            )}`}
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          {/* <div className="d-flex justify-content-between mt-n5">
            <label className="font-size-h6 text-dark pt-5">Password</label>
            <a href="/auth/forgot-password" className="text-primary font-size-h6 text-hover-primary pt-5" id="kt_login_forgot">Forgot Password ?</a>
          </div> */}
          <label className="font-size-h6 text-dark">Password</label>
          <input
            placeholder="Password"
            type="password"
            className={`form-control h-auto py-7 px-6 rounded-lg border-0 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            // disabled={formik.isSubmitting}
            className={`btn btn-primary font-size-h6 px-8 py-4 my-3 mr-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
