import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

const Home = loadable(() =>
  import("Pages/home/home")
);
const Launchpad = loadable(() =>
  import("Pages/launchpad/launchpad")
);

class AppRoutes extends React.Component {
  render() {    
    return (
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />}></Route>
        <Route path={ROUTES.LAUNCHPAD} element={<Launchpad />}></Route>
      </Routes>
    );
  }
}

export default AppRoutes;
