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

const nonAuthIndex = [
   { path: "/", component: WebHome },
   { path: "features", component: Features },
   { path: "about-us", component: AboutUs },
   { path: "pricing", component: Pricing },
   { path: "faqs", component: Faqs },
   { path: "contact", component: Contact },
   { path: "log-in", component: Login },
   { path: "sign-up", component: Signup },
   { path: "legal", component: Legal },
   { path: "reset-password", component: ResetPassword },
   { path: "*", component: NotFound },
]

export default nonAuthIndex