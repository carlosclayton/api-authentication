import "reflect-metadata";
import {container} from "tsyringe";
import {IUsersRepository} from "../repositories/IUsersRepository";
import {UsersRepository} from "../repositories/UsersRepository";
import {UserService} from "../services/UserService";
import {AuthService} from "../services/AuthService";
import {IAuthRepository} from "../repositories/IAuthRepository";
import {AuthRepository} from "../repositories/AuthRepository";
import {DateProvider} from "../providers/DateProvider";
import {MailProvider} from "../providers/MailProvider";
import {LocalStorageProvider} from "../providers/LocalStorageProvider";

// User Di
container.registerInstance<IUsersRepository>("UsersRepository", new UsersRepository(new LocalStorageProvider()))
const userService = container.resolve(UserService)

// Auth DI
container.registerInstance<IAuthRepository>("AuthRepository", new AuthRepository(new DateProvider, new MailProvider))
const authService = container.resolve(AuthService)

export {userService, authService}