import Dashboard from "../NewMainPage/Dashboard";
import Product from '../NewMainPage/Product/index'
import Report from '../NewMainPage/report'
import Settings from '../NewMainPage/settings'
import BlankPage from "../NewMainPage/BlankPage";

const index =  [
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'product',
        component: Product
    },
    {
        path:'blankpage',
        component: BlankPage
    },
    {
        path:'report',
        component: Report
    },
    {
        path:'settings',
        component: Settings
    },
   
    
]

export default index