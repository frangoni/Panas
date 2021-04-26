import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Checkin from "./CheckinContainer";
import Dashboard from "./DashboardContainer";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/checkin" component={Checkin} />
      <Route exact path="/admin" component={Dashboard} />

      <Redirect from="/*" to="/" />
    </Switch>
  );
}
