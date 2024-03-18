import {Switch, useRouteMatch} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Orders from "../components/tabs/orders/Orders";
import UploadOrder from "../components/tabs/orders/upload/UploadOrder";


const OrdersPaths = () => {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <ProtectedRoute path={`${match.url}/upload`} children={<UploadOrder/>}/>
                <ProtectedRoute path={`${match.url}/`} children={<Orders/>}/>
            </Switch>
        </div>
    )
}

export default OrdersPaths;