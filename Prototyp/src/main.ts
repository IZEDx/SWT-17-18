
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
import { IEmployeeData } from "./interfaces";

const path = (...str: string[]) => join(__dirname, "..", ...str);

/**
 * Entry point.
 * Connects to the database and starts the server.
 * @param {string[]} args Program Arguments
 */
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

    if ((await db.getEmployees()).length === 0) {
        console.log("Populating the Database with test Employees...");
        populateTestEmployees(db);
    }

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}

/**
 * Populates the database with test employees specified in testEmployees below.
 * @param {DatabaseController} db Database to populate.
 */
async function populateTestEmployees(db: DatabaseController) {
    const promises: Promise<void>[] = [];
    for (const emp of testEmployees) {
        const add = async () => {
            emp.password = await hash(emp.password, 5);
            await db.addEmployeeToDb(new Employee(db, emp))
        };
        promises.push(add());
    }
    await Promise.all(promises);
}

/**
 * Sample set of employees to test with.
 */
const testEmployees: IEmployeeData[] = [
    {
        forename: "admin",
        surname: "admin",
        dateOfBirth: new Date(1970, 1, 1),
        phone: "000000",
        qualifications: "",
        username: "admin",
        email: "",
        password: "admin",
        driverLicense: false,
        isAdmin: true,
        street: "",
        number: "",
        postcode: "",
        city: ""
    }
]