import {prisma} from "../database/prismaClient";
import {hash} from "bcrypt";
import {injectable, singleton} from "tsyringe";
import {IUsersRepository} from "./IUsersRepository";
import {IUserDTO} from "../interfaces/IUserDTO";
import {AppError} from "../util/AppError";
import {removeFile} from "../util/RemoveFile";


@singleton()
@injectable()
export class UsersRepository implements IUsersRepository {
    async create(user: IUserDTO) {

        const result = await prisma.users.findFirst({
            where: {
                username: user.username
            },
        })

        if (result) {
            throw new AppError("User already exist")
        }
        const hasPassword = await hash(user.password, 10)

        await prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                password: hasPassword,
                driver_licence: user.driver_licence,
                role: user.role
            }
        })

        return {
            message: "User created"
        }
    }

    async all(): Promise<any> {
        return await prisma.users.findMany();
    }

    async destroy(id: string): Promise<any> {
        try {
            await prisma.users.delete({
                where: {
                    id
                },
            });

        } catch (e) {
            throw new AppError("User not found")
        }

        return {
            message: "User deleted"
        }
    }

    async update(id: string, user: IUserDTO): Promise<any> {
        const hasPassword = await hash(user.password, 10)
        try {
            await prisma.users.update({
                where: {
                    id
                },data: {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    password: hasPassword,
                    driver_licence: user.driver_licence,
                    role: user.role,
                    token: user.token,
                    refresh_token: user.refresh_token,
                    expired_date: user.expired_date
                },

            });

        } catch (e) {
            throw new AppError("User not found")
        }

        return {
            message: "User updated"
        }

    }

    async find(id: string): Promise<any> {
        try {
            return await prisma.users.findUnique({
                where: {
                    id
                },
            });
        } catch (e) {
            throw new AppError("User not found")
        }

    }

    async avatar(id: string, filename: string): Promise<any> {
        const user = await this.find(id);

        if (user.avatar) {
            removeFile(`./uploads/${user.avatar}`)
        }

        try {
            return await prisma.users.update({
                where: {
                    id
                },
                data: {
                    avatar: filename
                },
            });
        } catch (e) {
            throw new AppError("User not found")
        }
    }
}
