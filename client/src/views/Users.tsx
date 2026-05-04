import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { User, ApiResponse } from '../types'
import toast from 'react-hot-toast';

const Users: React.FC = () => {
    // Initialize state with the User type array
    const [users, setUsers] = useState<User[]>([]);

    // Read operation function
    const fetchUsers = async () => {
        try {
            const { data } = await axios.get<ApiResponse>("http://localhost:4000/api/user/get-user");

            // Success
            if (data.success) {
                toast.success(data.message)
                setUsers(data.users);
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    // Delete operation function
    const handleDelete = async (id: string) => {
        try {
            const { data } = await axios.delete<ApiResponse>("http://localhost:4000/api/user/delete-user/" + id);
            // Instead of reloading the page, filter the local state for speed
            setUsers(users.filter(user => user.id !== id));
            toast.success(data.message)
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    return (
        <div className='flex min-h-screen bg-blue-600 justify-center items-center p-4'>
            <div className='w-full max-w-4xl bg-white rounded-lg shadow-xl p-6'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Student Directory</h2>
                    <Link to="/create" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200">
                        Add Student +
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='border-b-2 border-gray-100 bg-gray-50 text-gray-600 uppercase text-sm'>
                                <th className='py-3 px-4'>Name</th>
                                <th className='py-3 px-4'>Email</th>
                                <th className='py-3 px-4'>Age</th>
                                <th className='py-3 px-4 text-center'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-100'>
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                                    <td className='py-4 px-4 text-gray-700 font-medium'>{user.name}</td>
                                    <td className='py-4 px-4 text-gray-600'>{user.email}</td>
                                    <td className='py-4 px-4 text-gray-600'>{user.age}</td>
                                    <td className='py-4 px-4'>
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                to={`/update/${user.id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No students found. Add one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Users;