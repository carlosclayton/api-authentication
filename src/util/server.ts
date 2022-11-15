const express = require("express");
const app = express();
app.use(express.json())

import swaggerUI from "swagger-ui-express";
import swaggerFile from "../swagger.json"

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.listen(3000, () => {
    console.log("Listen Server...");
});