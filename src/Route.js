import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import SignUp from "./Pages/Register";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Homepage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routing;
