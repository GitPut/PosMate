import React, { useEffect } from "react";
import BackendPosContainer from "pages/authed/backendPos/BackendPosContainer";
import HomeScreen from "pages/authed/pos/HomeScreen";
import {
  RouteComponentProps,
  Switch,
  useHistory,
  Route,
} from "react-router-dom";

interface AuthRouteProps extends RouteComponentProps {
  // Add any other props here...
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { location } = props;
  const history = useHistory();

  useEffect(() => {
    const isLoginSettings = localStorage.getItem("isAuthedBackend");
    if (location.pathname?.includes("authed")) {
      if (isLoginSettings === "false") {
        history.push("/pos");
      }
    } else {
      history.push("/pos");
    }
  }, [location.pathname]);

  return (
    <Switch>
      <Route path="/pos" component={HomeScreen} />
      <Route path="/authed" component={BackendPosContainer} />
    </Switch>
  );
};

export default AuthRoute;
