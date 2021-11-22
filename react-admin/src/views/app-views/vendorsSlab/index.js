import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import VendorsSlabCreate from "./vendorsSlabCreate";
import VendorsSlabList from "./vendorsSlabList";

const VendorsSlab = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={VendorsSlabList} />
      <Route path={`${match.url}/new`} component={VendorsSlabCreate} />
      <Route path={`${match.url}/:id`} component={VendorsSlabCreate} />
    </Switch>
  )
};

export default VendorsSlab;