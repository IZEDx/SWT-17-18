
import express = require("express");
import { static as serveStatic, Router } from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";
import session = require("express-session");

import { login, isLoggedIn } from "./api/authentication";
import { DatabaseController } from "./databasecontroller";
import { Employee } from "./employee";
import { hash } from "bcrypt";
import { addEmployee, getEmployees } from "./api/employee";

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
        secret: 'SAFG§/EQGWBASDHU!)"§BFSU$',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    }));
    app.use(serveStatic(path("html"), {index: ["login.html"]}));
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use("/api", apiRouter);

    apiRouter.post("/login", login);
    apiRouter.get("/isloggedin", isLoggedIn);
    apiRouter.post("/employees", addEmployee);
    apiRouter.get("/employees", getEmployees);

    await db.addEmployeeToDb(new Employee(db, {
        forename: "admin",
        surname: "admin",
        dateOfBirth: new Date(1970, 1, 1),
        phone: "000000",
        qualifications: "",
        username: "admin",
        email: "",
        password: await hash("admin", 5),
        driverLicense: false,
        isAdmin: true,
        street: "",
        number: "",
        postcode: "",
        city: ""
    }));

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}