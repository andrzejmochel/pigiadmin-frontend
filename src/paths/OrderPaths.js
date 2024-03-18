import {Switch} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import OrderDetails from "../components/tabs/orders/order/details/OrderDetails";
import OrderPayments from "../components/tabs/orders/order/payments/OrderPayments";
import OrderRegistrations from "../components/tabs/orders/order/registrations/OrderRegistrations";
import OrderPackages from "../components/tabs/orders/order/parts/OrderPackages";


const OrderPaths = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path={`/order/:orderId/details`} children={<OrderDetails/>}/>
                <ProtectedRoute path={`/order/:orderId/payments`} children={<OrderPayments/>}/>
                <ProtectedRoute path={`/order/:orderId/registrations`} children={<OrderRegistrations/>}/>
                <ProtectedRoute path={`/order/:orderId/packages`} children={<OrderPackages/>}/>
            </Switch>
        </div>
    )
}

export default OrderPaths;