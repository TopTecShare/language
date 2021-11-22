import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import VendorMealCreate from "./vendorMealCreate";
import VendorMealList from "./vendorMealList";

const VendorMeals = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={VendorMealList} />
      <Route path={`${match.url}/new`} component={VendorMealCreate} />
      <Route path={`${match.url}/:id`} component={VendorMealCreate} />
    </Switch>
  )
};

export default VendorMeals;