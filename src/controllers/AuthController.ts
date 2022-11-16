import { Request, Response} from "express";
import {authService} from "./index";
import {IUserDTO} from "../interfaces/IUserDTO";

export class AuthController {
    async login(request: Request, response: Response) {
        const {email, password}: IUserDTO = request.body;

        const result = await authService.login(email, password)
        return response.json(result)
    }

}

