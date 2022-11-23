import "reflect-metadata";
import {container} from "tsyringe";
import {IUsersRepository} from "../repositories/IUsersRepository";
import {UsersRepository} from "../repositories/UsersRepository";
import {UserService} from "../services/UserService";
import {AuthService} from "../services/AuthService";
import {IAuthRepository} from "../repositories/IAuthRepository";
import {AuthRepository} from "../repositories/AuthRepository";
import {IDateProvider} from "../providers/IDateProvider";
import {DateProvider} from "../providers/DateProvider";
import {MailProvider} from "../providers/MailProvider";

// User Di
container.registerInstance<IUsersRepository>("UsersRepository", new UsersRepository)
const userService = container.resolve(UserService)

// Auth DI
container.registerInstance<IAuthRepository>("AuthRepository", new AuthRepository(new DateProvider, new MailProvider))
const authService = container.resolve(AuthService)

export {userService, authService}