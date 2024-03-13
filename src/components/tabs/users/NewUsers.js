import React, {useEffect, useState} from 'react';
import {useNotification} from "rc-notification";
import usersApiService from "../../../api/users/users.api.service";
import history from "../../../api/history/history";
import Modal from "../../Modal/Modal";
import AddUserForm from "./form/AddUserForm";

const NewUsers = () => {
    const [users, setUsers] = useState([]);
    const [notice, context] = useNotification({closable: true, maxCount: 1})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await usersApiService.getNewUsers();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    function handleShowUsers() {
        history.push('/users')
    }


    const handleDelete = async (id) => {
        await usersApiService.delete(id);
        await fetchUsers();
    };

    const onUserAdd = async (singUp) => {
        setIsModalOpen(false);
        try {
            await usersApiService.signUpUser(singUp);
            await fetchUsers();
            notice.open({
                content: 'User added. Should wait for confirmation email!'
            });
        } catch (e) {
            notice.open({
                content: 'New user added!'
            });
        }
    }
    const handleSignupUser = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="users-container">
            {context}
            <div className="actions">
                <h2>Actions</h2>
                <button onClick={handleShowUsers}>Confirmed users</button>
            </div>
            <h2>New Users</h2>
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
                            {!user.roles.includes("SUPER_ADMIN") &&
                                <button onClick={() => handleDelete(user.id)}>Delete</button>}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => handleSignupUser()}>Add User</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddUserForm onSubmit={onUserAdd}/>
            </Modal>
        </div>
    );
}

export default NewUsers;