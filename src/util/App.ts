import 'reflect-metadata';
import 'express-async-errors';
const express = require("express");
import {routes} from "../routes";


import {NextFunction, Request, request, Response, response} from "express";
const app = express();
app.use(express.json())
app.use(routes)

import swaggerUI from "swagger-ui-express";
import swaggerFile from "../swagger.json"

app.use((
    err: Error, request: Request, response: Response, next: NextFunction
) => {
    if (err){
        return response.status(400).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })

    next(err)
})

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

export {app}