import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Activities = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/list`} component={lazy(() => import(`./activityList`))} />
      <Route path={`${match.url}/new`} component={lazy(() => import(`./activityCreate`))} />
      <Route path={`${match.url}/:id`} component={lazy(() => import(`./activityEdit`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} />
    </Switch>
  </Suspense>
)};

export default Activities;