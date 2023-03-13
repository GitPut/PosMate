import React, { Component, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isSignedInSettingsState } from 'state/state';

// import SignIn from './SignIn'
// import ForgetPassword from './ForgetPassword';
// import SignUp from './SignUp'
// import Pos from './pos/pos'


// import Error404 from '../MainPage/ErrorPage/Error404';
// import Error500 from '../MainPage/ErrorPage/Error500';

import { useHistory } from "react-router-dom";
import Default from './Default';
import Login from "screens/non-authed/Login";
import WebHome from "screens/non-authed/WebHome";
import AboutUs from "screens/non-authed/AboutUs";
import Features from "screens/non-authed/Features";
import NotFound from "screens/non-authed/NotFound";
import Pricing from "screens/non-authed/Pricing";
import Faqs from "screens/non-authed/Faqs";
import Contact from "screens/non-authed/Contact";
import Signup from "screens/non-authed/Signup";
import ResetPassword from "screens/non-authed/ResetPassword";
import LatestUpdates from "screens/non-authed/LatestUpdates";
import Legal from "screens/non-authed/Legal";
import WebHomeHeader from 'components/WebHomeHeader';


const NonAuthRoute = (props) => {
    const isLoginSettings = isSignedInSettingsState.use()
    const { location } = props;
      const history = useHistory();
    
    useEffect(() => {
       if (location.pathname.includes("/authed")) {
           history.push("/");
    }
    }, [])
    

    return (
            <>
                {location.pathname !== '/log-in' && location.pathname !== '/sign-up' && location.pathname !== '/reset-password' && <WebHomeHeader location={location} />}
            <Switch>
                 <Route exact path="/" component={WebHome}/>
<Route path="/features" component={Features} />
<Route path="/about-us" component={AboutUs} />
<Route path="/pricing" component={Pricing} />
<Route path="/faqs" component={Faqs} />
<Route path="/contact" component={Contact} />
<Route path="/log-in" component={Login} />
<Route path="/sign-up" component={Signup} />
<Route path="/legal" component={Legal}/>
<Route path="/reset-password" component={ResetPassword} />
<Route path="/latest-updates" component={LatestUpdates}/>
<Route path="*" component={NotFound} />
            </Switch>
            </>
        )
}

export default NonAuthRoute