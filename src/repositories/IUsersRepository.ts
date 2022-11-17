import {IUserDTO} from "../interfaces/IUserDTO";
import File from "express"

export interface IUsersRepository{
    create(data:IUserDTO): Promise<any>;
    update(id: string, data:IUserDTO): Promise<any>;
    destroy(id:string): Promise<any>;
    all(): Promise<any>;
    find(id: string): Promise<any>;
    avatar(id: string, filename: string ): Promise<any>;
}