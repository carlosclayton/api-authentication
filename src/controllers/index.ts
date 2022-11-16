import "reflect-metadata";
import {container} from "tsyringe";
import {IUsersRepository} from "../repositories/IUsersRepository";
import {UsersRepository} from "../repositories/UsersRepository";
import {UserService} from "../services/UserService";

// User DI
container.registerInstance<IUsersRepository>("UsersRepository", new UsersRepository)
const userService = container.resolve(UserService)


export {userService}