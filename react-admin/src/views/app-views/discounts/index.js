import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import DiscountCreate from "./discountCreate";
import DiscountList from "./discountList";

const Discounts = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={DiscountList} />
      <Route path={`${match.url}/new`} component={DiscountCreate} />
      <Route path={`${match.url}/:id`} component={DiscountCreate} />
    </Switch>
  )
};

export default Discounts;