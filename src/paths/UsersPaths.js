import {Switch, useRouteMatch} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Users from "../components/tabs/users/Users";


const UsersPaths = () => {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <ProtectedRoute path={`${match.url}/`} children={<Users />}/>
            </Switch>
        </div>
    )
}

export default UsersPaths;