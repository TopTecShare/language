import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import VendorAmensCreate from "./vendorAmensCreate";
import VendorAmensList from "./vendorAmensList";

const VendorAmenities = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={VendorAmensList} />
      <Route path={`${match.url}/new`} component={VendorAmensCreate} />
      <Route path={`${match.url}/:id`} component={VendorAmensCreate} />
    </Switch>
  )
};

export default VendorAmenities;