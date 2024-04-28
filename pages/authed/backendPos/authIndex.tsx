import Dashboard from "./BackendPages/Dashboard/Dashboard";
import HelpIndex from "./BackendPages/Help/HelpIndex";
import Product from "./BackendPages/Product/index";
import Report from "./BackendPages/report";
import Settings from "./BackendPages/settings";

const index = [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "product",
    component: Product,
  },
  {
    path: "report",
    component: Report,
  },
  {
    path: "settings",
    component: Settings,
  },
  {
    path: "help",
    component: HelpIndex,
  },
];

export default index;
