import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {IPayload} from "../interfaces/IPayload";

export async function IsAuthentication(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        })
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub} = verify(token, process.env.HASH_KEY!) as IPayload;
        request.id = sub;
        return next();

    } catch (err) {
        return response.status(401).json({
            message: "Invalid Token"
        })
    }
}