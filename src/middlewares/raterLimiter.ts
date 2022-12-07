import {AppError} from "../util/AppError";

const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');
import {Request, Response, NextFunction} from "express";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT)
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
});

export default async function raterLimiter(
    request: Request,
    response: Response,
    necxt: NextFunction
): Promise<void>{
    try {
        await rateLimiter.consume(request.ip)
        return necxt()
    }catch (error){
           throw new AppError("Too many requests", 429)
    }
}