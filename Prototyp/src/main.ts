
import express = require("express");
import { static as serveStatic, Router } from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";
import session = require("express-session");

import { login, isLoggedIn } from "./api/authentication";
import { DatabaseController } from "./databasecontroller";
import { Employee } from "./employee";
import { DBAddressTable } from "./interfaces";
import { hash } from "bcrypt";
import { addEmployee } from "./api/employee";

const path = (...str: string[]) => join(__dirname, "..", ...str);

export async function main(args: string[]) {
    let port: number;
    const app = express();
    const apiRouter = Router();
    const db = await DatabaseController.singleton();

    try {
        port = parseInt(require("../config.json").port);
    } catch(err) {
        port = parseInt(require("../config-sample.json").port);
    }

    app.use(session({
        secret: 'swt17-18',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    }));
    app.use(serveStatic(path("html")));
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use("/api", apiRouter);

    apiRouter.post("/login", login);
    apiRouter.get("/isloggedin", isLoggedIn);
    apiRouter.post("/employee", addEmployee);

    const address: DBAddressTable = {
        street: "adminStreet",
        number: "0",
        postcode: "00000",
        city: "adminCity"
    }
    const employee = new Employee(
        db, "admin", "admin", 
        "000000", address, "admin", 
        "admin@localhost", await hash("admin", 5), "", 
        false, true);
    await db.addEmployeeToDb(employee);

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}