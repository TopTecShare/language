import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import SalesAgentList from "./salesAgentList";
import SalesAgentCreate from "./salesAgentCreate";

const SalesAgents = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={SalesAgentList} />
      <Route path={`${match.url}/new`} component={SalesAgentCreate} />
      <Route path={`${match.url}/:id`} component={SalesAgentCreate} />
    </Switch>
  )
};

export default SalesAgents;