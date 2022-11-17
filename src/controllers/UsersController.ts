import { Request, Response} from "express";
import {userService} from "./index";
import {IUserDTO} from "../interfaces/IUserDTO";

export class UsersController {
    async create(request: Request, response: Response) {
        const data: IUserDTO = request.body;
        const result = await userService.create(data)
        return response.json(result)
    }

    async update(request: Request, response: Response) {
        const {id}  = request.params;
        const data: IUserDTO = request.body;
        const result = await userService.update(id, data)
        return response.json(result)
    }

    async all(request: Request, response: Response) {
        const result = await userService.all()
        return response.json(result)
    }

    async find(request: Request, response: Response) {
        const {id}  = request.params;
        const result = await userService.find(id)
        return response.json(result)
    }

    async destroy(request: Request, response: Response) {
        const {id}  = request.params;
        const result = await userService.destroy(id)
        return response.json(result)
    }

    async avatar(request: Request, response: Response) {
        const id  = request.id;
        const file = request.file?.filename;
        const result = await userService.avatar(id, file!)
        return response.json(result)

    }
}

