import {inject, injectable} from "tsyringe";
import {IUsersRepository} from "../repositories/IUsersRepository";
import {IUserDTO} from "../interfaces/IUserDTO";

@injectable()
export class UserService {
    constructor(
        @inject("UsersRepository") public userRepository: IUsersRepository
    ) {
    }

    create(data:IUserDTO) {
        return this.userRepository.create(data);
    }
    update(id:string, data:IUserDTO) {
        return this.userRepository.update(id, data);
    }

    all() {
        return this.userRepository.all();
    }

    find(id: string ) {
        return this.userRepository.find(id);
    }

    destroy(id: string ) {
        return this.userRepository.destroy(id);
    }

    avatar(id: string, file: string ) {
        return this.userRepository.avatar(id, file);
    }


}