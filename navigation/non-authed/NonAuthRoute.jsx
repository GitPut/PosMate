import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Login from "pages/non-authed/Login";
import WebHome from "pages/non-authed/WebHome";
import AboutUs from "pages/non-authed/AboutUs";
import Features from "pages/non-authed/Features";
import NotFound from "pages/non-authed/NotFound";
import Pricing from "pages/non-authed/Pricing";
import Faqs from "pages/non-authed/Faqs";
import Contact from "pages/non-authed/Contact";
import Signup from "pages/non-authed/Signup";
import ResetPassword from "pages/non-authed/ResetPassword";
import Legal from "pages/non-authed/Legal";
import WebHomeHeader from 'components/non-authed/WebHomeHeader';
import OrderPage from 'pages/non-authed/OrderPage';

const NonAuthRoute = (props) => {
    const { location } = props;
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.includes("/authed")) {
            history.push("/");
        }
        if (
            location.pathname !== '/home' &&
            location.pathname !== '/features' &&
            location.pathname !== '/about-us' &&
            location.pathname !== '/pricing' &&
            location.pathname !== '/faqs' &&
            location.pathname !== '/contact' &&
            location.pathname !== '/log-in' &&
            location.pathname !== '/sign-up' &&
            location.pathname !== '/legal' &&
            location.pathname !== '/reset-password' &&
            !location.pathname.includes('/order/')
        ) {
            window.location.href = "https://divinepos.com"
        }
    }, [location.pathname])


    return (
        <>
            {location.pathname !== '/log-in' && location.pathname !== '/sign-up' && location.pathname !== '/reset-password' && !location.pathname.includes('/order/') && <WebHomeHeader />}
            <Switch>
                <Route path="/home" component={WebHome} />
                <Route path="/features" component={Features} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/faqs" component={Faqs} />
                <Route path="/contact" component={Contact} />
                <Route path="/log-in" component={Login} />
                <Route path="/sign-up" component={Signup} />
                <Route path="/legal" component={Legal} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/order/:urlEnding" component={OrderPage} />
                {/* <Route path="*" component={NotFound} /> */}
            </Switch>
        </>
    )
}

export default NonAuthRoute