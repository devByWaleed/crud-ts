import type { Request, Response } from "express"; // Use 'import type' for interfaces
// import UserModel from '../models/Users.js';
// Import your prisma instance from where you created the singleton
import prisma from "../lib/prisma.js";


// Create Controller Function
export const createUser = async (req: Request, res: Response) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.json({
            success: false,
            message: "Missing Details"
        })
    }

    try {
        // const existingUser = await UserModel.findOne({ email })
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already existed"
            })
        }

        // const user = new UserModel({ name, email, age })
        // await user.save();
        const user = await prisma.user.create({
            data: {
                name, email, age
            }
        })

        return res.json({
            success: true,
            message: "User Created Successfully"
        })
    }

    catch (error: any) {
        // FIX: Never pass the 'error' object itself to res.json()
        // Only pass the message string or a custom object
        return res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}


// Read Controller Function
export const getUser = async (req: Request, res: Response) => {

    try {
        // const users = await UserModel.find({})
        const users = await prisma.user.findMany()

        if (!users) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        return res.json({
            success: true,
            message: "Data Fetched Successfully",
            users,
        })
    }

    catch (error: any) {
        // FIX: Never pass the 'error' object itself to res.json()
        // Only pass the message string or a custom object
        return res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// Read Controller Function
export const getUserByID = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        // const userByID = await UserModel.findById({ _id: id })
        const userByID = await prisma.user.findUnique({
            where: { id: id as string }
        })

        // if (!users) {
        //     return res.json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }

        return res.json({
            success: true,
            message: "User Data Fetched",
            userByID,
        })
    }

    catch (error: any) {
        // FIX: Never pass the 'error' object itself to res.json()
        // Only pass the message string or a custom object
        return res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}


// Update Controller Function
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name, email, age } = req.body;

        // const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, { name, email, age }, { new: true, runValidators: true });
        const updatedUser = await prisma.user.update({
            where: { id: id as string },
            data: { name, email, age },
        });

        return res.json({
            success: true,
            message: "User Updated Successfully",
            updatedUser
        });

    } catch (error: any) {
        // FIX: Never pass the 'error' object itself to res.json()
        // Only pass the message string or a custom object
        return res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};



// Update Controller Function
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        // Empty for all users
        // await UserModel.findByIdAndDelete({ _id: id })
        await prisma.user.delete({
            where: { id: id as string }
        })

        return res.json({
            success: true,
            message: "User Deleted Successfully",
        })
    } catch (error: any) {
        // FIX: Never pass the 'error' object itself to res.json()
        // Only pass the message string or a custom object
        return res.json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}