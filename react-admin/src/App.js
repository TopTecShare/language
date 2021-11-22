import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { AUTH_PREFIX_PATH, THEME_CONFIG } from "./configs/AppConfig";
import { APP_PREFIX_PATH } from "./configs/AppConfig";
import { localeInfo } from "@telerik/kendo-intl";
import { Redirect, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import LoginForm from "views/auth-views/components/LoginForm";
// import { signOut } from "redux/actions/Auth";
import { signOut } from "./redux/actions/Auth";

import views from "./views";

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={THEME_CONFIG.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <Router>
            <Switch>
              {/* {authenticated ? ( */}
              <Route path="/" component={views} />
              {/* ) : ( */}
              {/* <Redirect to="/auth/login" /> */}
              {/* )} */}
            </Switch>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
