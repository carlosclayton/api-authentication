import 'reflect-metadata';
import 'express-async-errors';
const express = require("express");
import {routes} from "../routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../swagger.json"
import {NextFunction, Request, request, Response, response} from "express";
import upload from "./Upload";
import raterLimiter from "../middlewares/raterLimiter";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";


const app = express();
app.use(raterLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(express.json())
app.use(routes)
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))

app.use(Sentry.Handlers.errorHandler());
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