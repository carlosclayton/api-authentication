import {prisma} from "../database/prismaClient";
import {compare, hash} from "bcrypt";
import {inject, injectable, singleton} from "tsyringe";
import {IAuthRepository} from "./IAuthRepository";
import {AppError} from "../util/AppError";
import {Token} from "../util/Token";
import {Users} from "../models/Users";
import dayjs from "dayjs";
import {verify} from "jsonwebtoken";
import auth from "../config/auth";
import {IPayload} from "../interfaces/IPayload";


@singleton()
@injectable()
export class AuthRepository implements IAuthRepository {

    async login(email: string, password: string): Promise<any> {

        const user = await prisma.users.findFirst({
            where: {
                email
            },
        })

        if (!user) {
            throw new AppError("Email or password incorrect", 401)
        }
        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            throw new AppError("Email or password incorrect", 401)
        }

        const token = new Token(user as Users).getToken()
        const refresh_token = new Token(user as Users).getRefreshToken()
        const expired_date = dayjs().add(30, 'day').toDate()

        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                token: token,
                refresh_token,
                expired_date
            },
        })

        return {
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                avatar: user.avatar
            },
            token,
            refresh_token
        }
    }

    async refresh_token(token: string): Promise<any> {
        const decoded = verify(token, auth.refreshTokenHash);
        const {sub} = decoded as IPayload
        const expired_date = dayjs().add(30, 'day').toDate()

        const user = await prisma.users.findFirst({
            where: {
                id: sub,
                refresh_token: token
            }
        })

        if(!user) {
            throw new AppError("Refresh token doesn't not exist")
        }

        const new_token =  new Token(user as Users).getToken();
        const new_refresh_token =  new Token(user as Users).getRefreshToken();

        await prisma.users.update({
            where: {
                id: sub
            },
            data: {
                token: new_token,
                refresh_token: new_refresh_token,
                expired_date
            },
        })

        return  {
            "token": new_token
        }

    }
}
