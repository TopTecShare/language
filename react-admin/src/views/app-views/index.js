import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/units`}
          component={lazy(() => import(`./units`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/substitutions`}
          component={lazy(() => import(`./substitutions`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/acronyms`}
          component={lazy(() => import(`./acronyms`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/workspace`}
          component={lazy(() => import(`./workspace`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/dashboards`}
          component={lazy(() => import(`./dashboards`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/add-user`}
          component={lazy(() => import(`./addUsers`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/view-units`}
          component={lazy(() => import(`./units`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/activities`}
          component={lazy(() => import(`./activities`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/customers`}
          component={lazy(() => import(`./customers`))}
        />
        {/* <Route path={`${APP_PREFIX_PATH}/vendors`} component={lazy(() => import(`./vendors`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-meals`} component={lazy(() => import(`./vendorMeals`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-transports`} component={lazy(() => import(`./vendorTransports`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-amenities`} component={lazy(() => import(`./vendorAmenities`))} />
        <Route path={`${APP_PREFIX_PATH}/agent_slabs`} component={lazy(() => import(`./vendorsSlab`))} />
        <Route path={`${APP_PREFIX_PATH}/discounts`} component={lazy(() => import(`./discounts`))} />
        <Route path={`${APP_PREFIX_PATH}/linked-activities`} component={lazy(() => import(`./linkedActivities`))} />
        <Route path={`${APP_PREFIX_PATH}/orders`} component={lazy(() => import(`./orders`))} />
        <Route path={`${APP_PREFIX_PATH}/invoices`} component={lazy(() => import(`./invoice`))} />
        <Route path={`${APP_PREFIX_PATH}/sales_agent`} component={lazy(() => import(`./sales_agent`))} /> */}

        <Redirect
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/dashboards`}
        />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
