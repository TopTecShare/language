/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-column flex-row-auto"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15 pb-15">
              {/* start:: Aside header */}
              <Link to="/" className="text-center mb-10">
                <img
                  alt="Logo"
                  className="max-h-140px"
                  src={toAbsoluteUrl("/media/logos/logo_auth.png")}
                />
              </Link>
              {/* end:: Aside header */}
             
            </div>
            <div className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-x-center" style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/svg/illustrations/login-visual-5.svg")})`,
              }}></div>

            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto" style={{ backgroundColor: '#F3F5F9' }}>

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
