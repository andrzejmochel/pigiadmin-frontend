import React, {useEffect, useState} from 'react';
import {useNotification} from "rc-notification";
import {useRouteMatch} from "react-router-dom";
import usersApiService from "../../../api/users/users.api.service";
import history from "../../../api/history/history";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [notice, context] = useNotification({closable: true, maxCount: 1})
    const match = useRouteMatch();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await usersApiService.getConfirmedUsers();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    function handleShowNewUsers() {
        history.push(`${match.url}/new`)
    }

    const handleChangeRoles = (id) => {

    };

    function handleSendChangePassword(id) {

    }

    const handleDelete = async (id) => {
        await usersApiService.delete(id);
        await fetchUsers();
    };

    return (
        <div className="users-container">
            {context}
            <div className="actions">
                <h2>Actions</h2>
                <button onClick={handleShowNewUsers}>New users</button>
            </div>
            <h2>Users</h2>
            <table className="pigi-table">
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.userName}</td>
                        <td>{user.roles}</td>
                        <td>
                            { !user.roles.includes("SUPER_ADMIN") && <button onClick={() => handleChangeRoles(user.id)}>Change roles</button> }
                            { !user.roles.includes("SUPER_ADMIN") && <button onClick={() => handleSendChangePassword(user.id)}>Send change password</button> }
                            { !user.roles.includes("SUPER_ADMIN") && <button onClick={() => handleDelete(user.id)}>Delete</button> }

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;