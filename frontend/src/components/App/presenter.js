import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./styles.scss";
import Footer from "components/Footer";

const App = props => [
  // Nav,
  // Routes,
  props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoute key={2} />,
  <Footer key={3} />
];

const PrivateRoute = props => (
  <Switch>
    <Route exact path="/" render={() => "feed"} />
    <Route exact path="/explore" render={() => "explore"} />
  </Switch>
);

const PublicRoute = props => (
  <Switch>
    <Route exact path="/" render={() => "login"} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
);

export default App;
