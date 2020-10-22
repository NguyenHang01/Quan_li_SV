import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./HomeScreen"
import DetailScreen from "./DetailScreen";

export const Container = () => (
  <BrowserRouter>
    <Switch>
    <Route path="/home" component={HomeScreen} />
    <Route path="/detail" component={DetailScreen} />
    </Switch>
  </BrowserRouter>
);

export default Container;
