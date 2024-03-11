import {Route, Switch, useRouteMatch} from "react-router-dom";
import ChangePassword from "../components/changepassword/ChangePassword";
import ChangePasswordConfirm from "../components/changepassword/ChangePasswordConfirm";


const ChangePasswordPaths = () => {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.url}/request`} children={<ChangePassword />} />
                <Route path={`${match.url}/:pathToken`} children={<ChangePasswordConfirm />} />
            </Switch>
        </div>
    )
}

export default ChangePasswordPaths;