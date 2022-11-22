import {Role} from "../types/Role";

export class Users {
    id?: string;
    name:string;
    username: string;
    password: string;
    email: string;
    driver_licence: string;
    role: Role;
    token?: string;
    refresh_token?: string;
    expired_date?: Date;
    created_at?: Date;
}