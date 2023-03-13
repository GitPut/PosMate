import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./sidebar";

import "assets/plugins/fontawesome/css/fontawesome.min.css";
import "assets/plugins/fontawesome/css/all.min.css";
import "assets/css/bootstrap.min.css";
import "assets/js/bootstrap.bundle.min.js";
import "assets/css/font-awesome.min.css";
import "assets/css/line-awesome.min.css";
import "assets/css/style.css";

const DefaultLayout =(props)=> {
    const { match } = props;
    
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div>
            {routerService &&
              routerService.map((route, key) => (
                <Route
                  key={key}
                  path={`${match.url}/${route.path}`}
                  component={route.component}
                />
              ))}
          </div>
          <Sidebar />
        </div>
        <div className="sidebar-overlay"></div>
      </>
    );
}

export default withRouter(DefaultLayout);
