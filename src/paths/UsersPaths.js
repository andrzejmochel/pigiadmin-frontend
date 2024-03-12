import {Switch, useRouteMatch} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Users from "../components/tabs/users/Users";
import NewUsers from "../components/tabs/users/NewUsers";


const UsersPaths = () => {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <ProtectedRoute path={`${match.url}/new`} children={<NewUsers />}/>
                <ProtectedRoute path={`${match.url}/`} children={<Users />}/>
            </Switch>
        </div>
    )
}

export default UsersPaths;