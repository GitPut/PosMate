import React, { useEffect } from 'react';
import Login from "pages/non-authed/Login";
import Signup from "pages/non-authed/Signup";
import ResetPassword from "pages/non-authed/ResetPassword";
import OrderPage from 'pages/non-authed/OrderPage';
import {
  RouteComponentProps,
  Switch,
  useHistory,
  Route,
} from "react-router-dom";

interface NonAuthRouteProps extends RouteComponentProps {
    // Add any other props here...
}

const NonAuthRoute: React.FC<NonAuthRouteProps> = (props) => {
    const { location } = props;
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.includes("/authed")) {
            history.push("/");
        }
        if (
            location.pathname !== '/log-in' &&
            location.pathname !== '/sign-up' &&
            location.pathname !== '/reset-password' &&
            !location.pathname.includes('/order/')
        ) {
            window.location.href = "https://divinepos.com"
        }
    }, [location.pathname])


    return (
        <>
            <Switch>
                <Route path="/log-in" component={Login} />
                <Route path="/sign-up" component={Signup} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/order/:urlEnding" component={OrderPage} />
            </Switch>
        </>
    )
}

export default NonAuthRoute