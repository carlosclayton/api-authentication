import {Role} from "../types/Role";

export class Reset{
    id?: string;
    userId: string;
    token: string;
    expired_date: Date;
    created_at?: Date;
}