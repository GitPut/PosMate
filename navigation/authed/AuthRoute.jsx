import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from 'pages/authed/pos/HomeScreenOld';
import { useHistory } from "react-router-dom";
import BackendPosContainer from 'pages/authed/backendPos/BackendPosContainer';

const AuthRoute = (props) => {
    const { location } = props;
    const history = useHistory();

    useEffect(() => {
        const isLoginSettings = localStorage.getItem("isAuthedBackend")
        if (location.pathname?.includes("authed")) {
            if (isLoginSettings === 'false') {
                history.push("/pos");
            }
        } else {
            history.push("/pos");
        }
    }, [location.pathname])

    return (
        <Switch>
            <Route path="/pos" component={HomeScreen} />
            <Route path="/authed" component={BackendPosContainer} />
        </Switch>
    )
}

export default AuthRoute