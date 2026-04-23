import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import type { ApiResponse } from '../types'
import toast from 'react-hot-toast'

const CreateUser: React.FC = () => {
    // States for get data
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [age, setAge] = useState<number>(0)

    // Navigator for component navigation
    const navigate = useNavigate()

    // Function to send post request
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const { data } = await axios.post<ApiResponse>("http://localhost:4000/api/user/create-user", { name, email, age })

            // Navigate back to homepage right after adding data
            if (data.success) {
                toast.success(data.message)
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        <div className="flex h-screen bg-blue-600 justify-center items-center">
            <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4">Add Student</h2>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="name">Name</label>
                        <input
                            required
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="age">Age</label>
                        <input
                            required
                            type="number"
                            id="age"
                            placeholder="Enter Age"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setAge(Number(e.target.value))}
                            value={age}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
                            Add
                        </button>
                        <button type="button" onClick={() => navigate('/')} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
