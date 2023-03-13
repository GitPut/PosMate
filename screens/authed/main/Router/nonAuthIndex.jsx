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

const nonAuthIndex = [
   { path:"/", component:WebHome},
{ path:"features", component:Features },
{ path:"about-us", component:AboutUs },
{ path:"pricing", component:Pricing },
{ path:"faqs", component:Faqs },
{ path:"contact", component:Contact },
{ path:"log-in", component:LatestUpdates },
{ path:"sign-up", component:Legal },
{ path:"legal", component:Login},
{ path:"reset-password", component:Signup },
{ path:"latest-updates", component:ResetPassword},
{ path:"*", component:NotFound },
]

export default nonAuthIndex