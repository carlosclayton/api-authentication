import {inject, injectable} from "tsyringe";
import {IUserDTO} from "../interfaces/IUserDTO";
import {IAuthRepository} from "../repositories/IAuthRepository";

@injectable()
export class AuthService {
    constructor(
        @inject("AuthRepository") public authRepository: IAuthRepository
    ) {
    }

    login(email: string, password:string) {
        return this.authRepository.login(email, password)
    }
}