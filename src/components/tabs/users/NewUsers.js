import React, {useEffect, useState} from 'react';
import usersApiService from "../../../api/users/users.api.service";
import history from "../../../api/history/history";
import Modal from "../../Modal/Modal";
import AddUserForm from "./form/AddUserForm";
import toast from "react-hot-toast";
import ConfirmationToastContent from "../../confirmation/ConfirmationToastContent";

const NewUsers = () => {
    const [users, setUsers] = useState([]);
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

    const onConfirmDelete = async (id) => {
        await toast.promise(usersApiService.delete(id), {
            loading: 'Deleting ...',
            success: <b>User deleted</b>,
            error: <b>User deletion failed</b>
        });
        await fetchUsers();
    }
    const handleDelete = async (id) => {
        toast.custom((t) => (<ConfirmationToastContent content={(<b>Do you want to delete user?</b>)} confirmed={id} t={t} onConfirm={onConfirmDelete} />))
    };

    const onUserAdd = async (singUp) => {
        setIsModalOpen(false);
        try {
            await usersApiService.signUpUser(singUp);
            await fetchUsers();
            toast.success('User added. Should wait for confirmation email!');
        } catch (e) {
            toast.error( 'New user added!');
        }
    }
    const handleSignupUser = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="users-container">
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