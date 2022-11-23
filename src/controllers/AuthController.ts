import { Request, Response} from "express";
import {authService} from "./index";
import {IUserDTO} from "../interfaces/IUserDTO";

export class AuthController {
    async login(request: Request, response: Response) {
        const {email, password}: IUserDTO = request.body;

        const result = await authService.login(email, password)
        return response.json(result)
    }

    async refresh_token(request: Request, response: Response) {
        const token = request.body.token || request.headers['x-access-token'] || request.query.token;
        const result = await authService.refresh_token(token)
        return response.json(result)
    }

    async forgot(request: Request, response: Response){
        const {email}: IUserDTO = request.body;
        const result = await authService.forgot(email)
        return response.json(result)
    }

    async reset(request: Request, response: Response){
        const { token } = request.query;
        const { password }: IUserDTO = request.body;
        const result = await authService.reset(String(token), password)
        return response.json(result)
    }


}

