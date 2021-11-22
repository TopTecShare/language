import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import VendorTransCreate from "./vendorTransCreate";
import VendorTransList from "./vendorTransList";

const VendorTransports = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={VendorTransList} />
      <Route path={`${match.url}/new`} component={VendorTransCreate} />
      <Route path={`${match.url}/:id`} component={VendorTransCreate} />
    </Switch>
  )
};

export default VendorTransports;