
import express = require("express");
import { static as serveStatic, Router, Request, Response } from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";
import { EmployeeRoute } from "./employee";

const path = (...str: string[]) => join(__dirname, "..", ...str);


export async function main(args: string[]) {
    const port = process.env.PORT || parseInt(args[2], 10) || 8080;
    const app = express();
    const apiRouter = Router();

    app.use(serveStatic(path("html")));
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use("/api", apiRouter);

    apiRouter.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });
    EmployeeRoute(apiRouter.route("/employee"));

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}