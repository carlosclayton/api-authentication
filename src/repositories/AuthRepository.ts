import {prisma} from "../database/prismaClient";
import {compare, hash} from "bcrypt";
import {injectable, singleton} from "tsyringe";
import {IUserDTO} from "../interfaces/IUserDTO";
import {IAuthRepository} from "./IAuthRepository";
import {sign} from "jsonwebtoken";


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
            throw new Error("Email or password incorrect")
        }
        const matchPassword = await compare(password, result.password);

        if (!matchPassword) {
            throw new Error("Email or password incorrect")
        }

        const token  = sign({}, process.env.HASH_KEY!, {
            subject: result.id,
            expiresIn: "1d"
        })
        return {token}
    }
}
