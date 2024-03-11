import React, {useEffect, useState} from 'react';
import Modal from "../../Modal/Modal";
import {useNotification} from "rc-notification";
import {useRouteMatch} from "react-router-dom";
import usersApiService from "../../../api/users/users.api.service";
import AddUserForm from "./form/AddUserForm";
import history from "../../../api/history/history";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        history.push(`${match}/new`)
    }

    const handleChangeRoles = (id) => {

    };

    function handleSendChangePassword(id) {

    }

    const handleDelete = (id) => {

    };
    const handleSignupUser = () => {
        setIsModalOpen(true)
    };

    const onUserAdd = async (singUp) => {
        setIsModalOpen(false);

        try {
            await usersApiService.signUpUser(singUp);
            notice.open({
                content: 'User added. Should wait for confirmation email!'
            });
        } catch (e) {
            notice.open({
                content: 'New user added!'
            });
        }


    }

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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddUserForm onSubmit={onUserAdd} />
            </Modal>
        </div>
    );
}

export default Users;