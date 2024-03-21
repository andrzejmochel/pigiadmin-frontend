import React from 'react';
import {NavLink, Switch} from 'react-router-dom';

import PriceLists from '../tabs/pricelists/PriceLists';
import './Main.css';
import ProtectedRoute from "../../ProtectedRoute";
import OrdersPaths from "../../paths/OrdersPaths";
import UsersPaths from "../../paths/UsersPaths";
import UploadOrder from "../tabs/orders/upload/UploadOrder";
import Order from "../tabs/orders/order/Order";
import {useAuth} from "../../api/authentication/AuthContext";
import history from "../../api/history/history";

const Main = () => {
    const {logout} = useAuth()
    const handleLogout = () => {
        logout();
        history.push('/login')
    };
    return (
        <div>
            <div className="header">
                <h2 style={{margin: '0 auto'}}>Pigi Admin</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <nav className="navbar">
                <ul>
                    <li><NavLink to="/users">Users</NavLink></li>
                    {/*<li><Link to="/administration">Administration</Link></li>*/}
                    <li><NavLink to="/price-lists">Price Lists</NavLink></li>
                    <li><NavLink to="/orders">Orders</NavLink></li>
                    <li><NavLink to="/import">Import</NavLink></li>
                </ul>

            </nav>
            <Switch>
                <ProtectedRoute path="/users" children={<UsersPaths/>}/>
                {/*<Route path="/administration" component={Administration} />*/}
                <ProtectedRoute path="/price-lists" children={<PriceLists/>}/>
                <ProtectedRoute path="/orders" children={<OrdersPaths/>}/>
                <ProtectedRoute path="/import" children={<UploadOrder/>}/>
                <ProtectedRoute path="/order/:orderId" children={<Order/>}/>
                {/*<Route path="/orders" component={Orders} />*/}
            </Switch>
        </div>
    );
}

export default Main;