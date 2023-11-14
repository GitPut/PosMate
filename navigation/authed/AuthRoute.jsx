import React, { Component, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeScreen from 'screens/authed/HomeScreen';
import DefaultLayout from 'screens/authed/main/InitialPage/Sidebar/DefaultLayout';
import { isSignedInSettingsState } from 'state/state';

// import SignIn from './SignIn'
// import ForgetPassword from './ForgetPassword';
// import SignUp from './SignUp'
// import Pos from './pos/pos'


// import Error404 from '../MainPage/ErrorPage/Error404';
// import Error500 from '../MainPage/ErrorPage/Error500';

import { useHistory } from "react-router-dom";


const AuthRoute = (props) => {
    const isLoginSettings = isSignedInSettingsState.use()
    const { location } = props;
    const history = useHistory();

    useEffect(() => {
        if (!location.pathname.includes("/authed") || location.pathname.includes("/authed") && isLoginSettings === false) {
            history.push("/pos");
        }
        // else {
        //     history.push("/authed");
        // }
        // //CHANGE BACK ONCE PUBLISHING
    }, [])


    return (
        <Switch>
            {/* <Route path="/signIn" component={SignIn} />
                <Route path="/forgetPassword" component={ForgetPassword} />
                <Route path="/signUp" component={SignUp} /> */}
            <Route path="/pos" component={HomeScreen} />
            <Route path="/authed" component={DefaultLayout} />

            {/* <Route path="/error-404" component={Error404} />
                <Route path="/error-500" component={Error500} />
                <Route path="/pos" component={Pos} /> */}

        </Switch>
    )
}

export default AuthRoute