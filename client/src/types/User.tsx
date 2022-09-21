// user model interface type
export interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}