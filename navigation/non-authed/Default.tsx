import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import nonAuthIndex from "screens/authed/main/Router/nonAuthIndex";

const Default = (props) => {
  const { match } = props;

  return (
    <>
        <div>
          {nonAuthIndex &&
            nonAuthIndex.map((route, key) => (
              <Route
                key={key}
                path={`${match.url}/${route.path}`}
                component={route.component}
              />
            ))}
        </div>
    </>
  );
};

export default withRouter(Default);
