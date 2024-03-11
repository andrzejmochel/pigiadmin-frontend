import React, {useEffect, useState} from 'react';
import Modal from "../../Modal/Modal";
import {useNotification} from "rc-notification";
import {useRouteMatch} from "react-router-dom";
import usersApiService from "../../../api/users/users.api.service";

const Users = () => {
    const [users, setUsers] = useState([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [notice, context] = useNotification({closable: true, maxCount: 1})
    const match = useRouteMatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await usersApiService.getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchUsers();
    }, []);

    function handleShowNewUsers() {

    }

    const handleChangeRoles = (id) => {

    };

    function handleSendChangePassword(id) {

    }

    const handleDelete = (id) => {

    };
    const handleSignupUser = () => {

    };

    return (
        <div className="users-container">
            {context}
            <div className="actions">
                <h2>Actions</h2>
                <button onClick={handleShowNewUsers}>New users</button>
            </div>
            <h2>Orders</h2>
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
                            { !user.roles.includes("SUPER_ADMIN") && <button onClick={() => handleSendChangePassword(user.id)}>Show</button> }
                            { !user.roles.includes("SUPER_ADMIN") && <button onClick={() => handleDelete(user.id)}>Delete</button> }

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => handleSignupUser()}>Add User</button>
            {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>*/}
            {/*    <PrepareOrderForm onSubmit={onPrepared} priceLists={priceList}/>*/}
            {/*</Modal>*/}
        </div>
    );
}

export default Users;