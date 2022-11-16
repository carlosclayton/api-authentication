import {IUserDTO} from "../interfaces/IUserDTO";


export interface IUsersRepository{
    create(data:IUserDTO): Promise<any>;
    update(id: string, data:IUserDTO): Promise<any>;
    destroy(id:string): Promise<any>;
    all(): Promise<any>;
    find(id: string): Promise<any>;
}