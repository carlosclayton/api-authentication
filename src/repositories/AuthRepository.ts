import {prisma} from "../database/prismaClient";
import {compare, hash} from "bcrypt";
import {injectable, singleton} from "tsyringe";
import {IUserDTO} from "../interfaces/IUserDTO";
import {IAuthRepository} from "./IAuthRepository";
import {sign} from "jsonwebtoken";
import {AppError} from "../util/AppError";


@singleton()
@injectable()
export class AuthRepository implements IAuthRepository{
    async login(email: string, password:string): Promise<any> {

        const result = await prisma.users.findFirst({
            where: {
                email
            },
        })

        if (!result) {
            throw new AppError("Email or password incorrect", 401)
        }
        const matchPassword = await compare(password, result.password);

        if (!matchPassword) {
            throw new AppError("Email or password incorrect",401)
        }

        const token  = sign({}, process.env.HASH_KEY!, {
            subject: result.id,
            expiresIn: "1d"
        })
        return {token}
    }
}
