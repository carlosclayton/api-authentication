import {Role} from "../types/Role";


export interface IUserDTO{
    name:string;
    username: string;
    password: string;
    email: string;
    driver_licence: string;
    role?: Role;
    created_at?: Date
}