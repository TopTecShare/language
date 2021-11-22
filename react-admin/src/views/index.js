import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import { useHistory } from "react-router";
import { isAnyOf } from "@reduxjs/toolkit";

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${AUTH_PREFIX_PATH}/login`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  const { locale, token, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  const ENTRY_ROUTE = "/auth/login";
  const history = useHistory();
  if (localStorage.getItem("auth_token")) {
    const authData = JSON.parse(localStorage.getItem("auth_token"));
    let today = Date.now();
    today = new Date(today);
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (authData.lastLogin != date) {
      localStorage.removeItem("auth_token");
      history.push(ENTRY_ROUTE);
      window.location.reload();
    }
  }

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  let { token } = auth;
  return { locale, direction, token };
};

export default withRouter(connect(mapStateToProps)(Views));
