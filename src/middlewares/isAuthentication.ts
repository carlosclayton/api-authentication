import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";
import {IPayload} from "../interfaces/IPayload";
import auth from "../config/auth";

export async function IsAuthentication(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        })
    }

    const [, token] = authHeader.split(" ");

    try {
        verify(token, auth.tokenHash, (error, decoded) => {
            if (error) {
                return response.status(401).json({message: 'Unauthorized access.' });
            } else{
                const {sub} = decoded as IPayload
                request.id = sub
                return next();
            }
        });


    } catch (err) {
        return response.status(401).json({
            message: "Invalid token"
        })
    }
}