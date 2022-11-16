import {IUserDTO} from "../interfaces/IUserDTO";


export interface IAuthRepository{
    login(email: string, password:string): Promise<any>;

}