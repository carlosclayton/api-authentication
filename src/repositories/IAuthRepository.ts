import {IUserDTO} from "../interfaces/IUserDTO";


export interface IAuthRepository{
    login(email: string, password:string): Promise<any>;
    refresh_token(token: string): Promise<any>;
}