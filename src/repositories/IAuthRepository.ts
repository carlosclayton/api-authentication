import {IUserDTO} from "../interfaces/IUserDTO";


export interface IAuthRepository{
    register(name: string, username: string, email: string, password:string, driver_licence:string): Promise<any>;
    login(email: string, password:string): Promise<any>;
    refresh_token(token: string): Promise<any>;
    forgot(email: string): Promise<any>;
    reset(token: string, password: string): Promise<any>;
}