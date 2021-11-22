import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import VendorCreate from "./vendorCreate";
import VendorList from "./vendorList";

const Vendors = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={VendorList} />
      <Route path={`${match.url}/new`} component={VendorCreate} />
      <Route path={`${match.url}/:id`} component={VendorCreate} />
    </Switch>
  )
};

export default Vendors;