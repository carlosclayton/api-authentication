import {Role} from "../types/Role";
import {dto, include, transform} from "dto-mapper";

@dto()
export class Users {
    @include()
    id?: string;
    @include()
    name:string;
    @include()
    username: string;
    @include()
    password: string;
    @include()
    email: string;
    @include()
    driver_licence: string;
    @include()
    role: Role;
    @include()
    token?: string;

    @include()
    @transform({
        toDto: (avatar) => `${process.env.API_URL}/avatar/${avatar}`,
        fromDto: (avatar) => `${process.env.API_URL}/avatar/${avatar}`,
    })
    avatar: string;
    @include()
    refresh_token?: string;
    @include()
    expired_date?: Date;
    @include()
    created_at?: Date;


    // @Expose()
    // // @ts-ignore
    // get AvatarUrl():string{
    //     return `${process.env.API_URL}/avatar/${this.avatar}`
    // }
}