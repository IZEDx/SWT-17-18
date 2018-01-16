
import express = require("express");
import { static as serveStatic, Router } from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";
import { EmployeeRoute } from "./employee";
import { login, isLoggedIn } from "./authentication";

const path = (...str: string[]) => join(__dirname, "..", ...str);

export async function main(args: string[]) {
    const port = parseInt((require("../config.json") || require("../config-sample.json")).port, 10);
    const app = express();
    const apiRouter = Router();

    app.use(serveStatic(path("html")));
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use("/api", apiRouter);

    apiRouter.post("/login", login);
    apiRouter.get("/isloggedin", isLoggedIn);
    EmployeeRoute(apiRouter.route("/employee"));

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}