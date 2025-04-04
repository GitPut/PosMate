import React from "react";
import { Route } from "react-router-dom";
import { TrialDetailsStateProps } from "types/global";
const PaymentUpdateNotification = React.lazy(
  () =>
    import(
      "components/UserPaymentScreens/PaymentDeclined/PaymentUpdateNotification"
    )
);
const AuthRoute = React.lazy(() => import("./authed/AuthRoute"));
const TrialEnded = React.lazy(
  () => import("components/UserPaymentScreens/TrialEnded/TrialEnded")
);
const NewUserPayment = React.lazy(
  () => import("components/UserPaymentScreens/NewUserPayment/NewUserPayment")
);

interface NavigationContentProps {
  isNewUser: boolean;
  isCanceled: boolean;
  isSubscribed: boolean;
  trialDetails: TrialDetailsStateProps;
}

const NavigationContent = ({
  isNewUser,
  isCanceled,
  isSubscribed,
  trialDetails,
}: NavigationContentProps) => {
  if (trialDetails.hasEnded && !isSubscribed && !isNewUser) { //added these conditions because before if you were a new user and your trial ended, you would see the trial ended screen even if you had already paid
    return <TrialEnded />;
  } else if (isNewUser) {
    return <NewUserPayment />;
  } else if (isCanceled && !isSubscribed && !isNewUser) {
    return <PaymentUpdateNotification isCanceled={isCanceled} />;
  } else {
    return <Route path="/" component={AuthRoute} />;
  }
};

export default NavigationContent;
