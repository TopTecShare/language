import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Dashboards = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
    <Route path={`${match.url}/analytics`} component={lazy(() => import(`./analytic`))} />
    <Route path={`${match.url}/finance`} component={lazy(() => import(`./default`))} />
    <Route path={`${match.url}/`} component={lazy(() => import(`./sales`))} />
  
    </Switch>
  </Suspense>
)};

export default Dashboards;