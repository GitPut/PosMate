import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from 'pages/authed/pos/HomeScreen';
import DefaultLayout from 'pages/authed/backendPos/InitialPage/Sidebar/DefaultLayout';
import { useHistory } from "react-router-dom";
import BackendPosContainer from 'pages/authed/newBackendPos/BackendPosContainer';

const AuthRoute = (props) => {
    const { location } = props;
    const history = useHistory();

    useEffect(() => {
        const isLoginSettings = localStorage.getItem("isAuthedBackend")
        if (!location.pathname?.includes("/authed") || location.pathname?.includes("/authed") && isLoginSettings === false) {
            history.push("/pos");
        }
        // else {
        //     history.push("/authed");
        // }
        // //CHANGE BACK ONCE PUBLISHING
    }, [])

    // useEffect(() => {
    //     if (
    //         location.pathname !== '/pos' &&
    //         location.pathname !== '/authed'
    //     ) {
    //         history.push("/pos");
    //     }
    // }
    //     , [location.pathname])

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         // Chrome requires returnValue to be set
    //         event.returnValue = '';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    // }, []);



    return (
        <Switch>
            {/* <Route path="/signIn" component={SignIn} />
                <Route path="/forgetPassword" component={ForgetPassword} />
                <Route path="/signUp" component={SignUp} /> */}
            <Route path="/pos" component={HomeScreen} />
            {/* <Route path="/authed" component={DefaultLayout} /> */}
            <Route path="/authed" component={BackendPosContainer} />

            {/* <Route path="/error-404" component={Error404} />
                <Route path="/error-500" component={Error500} />
                <Route path="/pos" component={Pos} /> */}

        </Switch>
    )
}

export default AuthRoute