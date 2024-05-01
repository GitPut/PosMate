import React from "react";
import { Route } from "react-router-dom";
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
  resetLoader: () => void;
  isNewUser: boolean;
  isCanceled: boolean;
  isSubscribed: boolean;
  trialDetails: {
    hasEnded: boolean;
  };
}

const NavigationContent = ({
  resetLoader,
  isNewUser,
  isCanceled,
  isSubscribed,
  trialDetails,
}: NavigationContentProps) => {
  if (trialDetails.hasEnded) {
    return <TrialEnded resetLoader={resetLoader} />;
  } else if (isNewUser) {
    return <NewUserPayment resetLoader={resetLoader} />;
  } else if (isCanceled && !isSubscribed && !isNewUser) {
    return (
      <PaymentUpdateNotification
        resetLoader={resetLoader}
        isCanceled={isCanceled}
      />
    );
  } else {
    return <Route path="/" component={AuthRoute} />;
  }
};

export default NavigationContent;
