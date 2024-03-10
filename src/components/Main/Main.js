// components/Main.js
import React from 'react';
import {Link, Switch} from 'react-router-dom';
// import Users from './Users';
// import Administration from './Administration';
import PriceLists from '../tabs/pricelists/PriceLists';
import './Main.css';
import ProtectedRoute from "../../ProtectedRoute";
import Orders from "../tabs/orders/Orders";
import OrdersPaths from "../../paths/OrdersPaths";

const Main = () => {
    return (
        <div>
            <h2>Main Page with Tabs</h2>
            <nav className="navbar">
                <ul>
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/administration">Administration</Link></li>
                    <li><Link to="/price-lists">Price Lists</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                </ul>
            </nav>
            <Switch>
                {/*<Route path="/users" component={Users} />*/}
                {/*<Route path="/administration" component={Administration} />*/}
                <ProtectedRoute path="/price-lists" children={<PriceLists/>}/>
                <ProtectedRoute path="/orders" children={<OrdersPaths/>}/>

                {/*<Route path="/orders" component={Orders} />*/}
            </Switch>
        </div>
    );
}

export default Main;