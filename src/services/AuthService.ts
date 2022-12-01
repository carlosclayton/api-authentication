import {inject, injectable} from "tsyringe";
import {IUserDTO} from "../interfaces/IUserDTO";
import {IAuthRepository} from "../repositories/IAuthRepository";

@injectable()
export class AuthService {
    constructor(
        @inject("AuthRepository")
        public authRepository: IAuthRepository
    ) {
    }

    login(email: string, password:string) {
        return this.authRepository.login(email, password)
    }

    refresh_token(token: string) {
        return this.authRepository.refresh_token(token)
    }

    forgot(email: string){
        return this.authRepository.forgot(email)
    }

    reset(token: string, password: string){
        return this.authRepository.reset(token, password)
    }

    register(name: string, username: string, email: string, password:string, driver_licence:string){
        return this.authRepository.register(name, username, email, password, driver_licence);
    }

}