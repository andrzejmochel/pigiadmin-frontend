// components/Main.js
import React from 'react';
import {Route, Routes, Link} from 'react-router-dom';
// import Users from './Users';
// import Administration from './Administration';
import PriceLists from '../tabs/pricelists/PriceLists';
import './Main.css';
import ProtectedRoute from "../../ProtectedRoute";
import Orders from "../tabs/orders/Orders";

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
            <Routes>
                {/*<Route path="/users" component={Users} />*/}
                {/*<Route path="/administration" component={Administration} />*/}
                <Route path="/price-lists" element={
                    <ProtectedRoute element={<PriceLists />} />
                }/>
                <Route path="/orders" element={
                    <ProtectedRoute element={<Orders />} />
                }/>
                {/*<Route path="/orders" component={Orders} />*/}
            </Routes>
        </div>
    );
}

export default Main;