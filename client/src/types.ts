// Interface matching MongoDB Model
export interface User {
    _id: string;
    name: string;
    email: string;
    age: number;
}


// Interface matching Data we receive from API
export interface ApiResponse {
    success: boolean;
    message: string;
    users: User[];
    userByID: User;
    updatedUser: User;
}