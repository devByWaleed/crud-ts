import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import type { ApiResponse } from '../types'
import toast from 'react-hot-toast'

const UpdateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [age, setAge] = useState<number>(0)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get<ApiResponse>("http://localhost:4000/api/user/data/" + id)

                // Setting data in respective fields
                setName(data.userByID.name)
                setEmail(data.userByID.email)
                setAge(data.userByID.age)

                toast.success(data.message)
            } catch (error: any) {
                toast.error(error.message)
            }
        }
        if (id) fetchUserData()
    }, [id])


    const handleUpdate = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            // Send all 3 fields so the others don't become empty
            const updatedData = { name, email, age: Number(age) }

            const { data } = await axios.put<ApiResponse>("http://localhost:4000/api/user/update-user/" + id, updatedData)

            // Setting data in respective fields
            setName(data.updatedUser.name)
            setEmail(data.updatedUser.email)
            setAge(data.updatedUser.age)

            // Success
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex h-screen bg-blue-600 justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                <form onSubmit={handleUpdate}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Student</h2>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Name</label>
                        <input
                            required
                            type="text"
                            placeholder="Enter Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input
                            required
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Age</label>
                        <input
                            required
                            type="number"
                            placeholder="Enter Age"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={e => setAge(Number(e.target.value))}
                            value={age}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
                            Update
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

export default UpdateUser