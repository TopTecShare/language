import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import LinkedActivityCreate from "./linkedActivityCreate";
import LinkedActivityList from "./linkedActivityList";

const linkedActivities = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={LinkedActivityList} />
      <Route path={`${match.url}/new`} component={LinkedActivityCreate} />
      <Route path={`${match.url}/:id`} component={LinkedActivityCreate} />
    </Switch>
  )
};

export default linkedActivities;