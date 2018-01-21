import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { compare } from "bcrypt";
import { sessionExists } from "../utils";
import { ISession } from "../interfaces";

export async function login(req: Request, res: Response) {
    const session: any|ISession = req.session;
    if (sessionExists(session)) {
        res.send({
            success: true,
            error: "Bereits eingeloggt."
        });
        return;
    }

    const db = await DatabaseController.singleton();
    const emps = await db.getEmployees({key: "username", value: req.body.username});

    if (emps.length > 0 && await compare(req.body.password, emps[0].password)) {
        session.employee = emps[0];
        res.send({
            success: true,
            error: ""
        });
    } else {
        res.send({
            success: false,
            error: "Der Username oder Passwort wurde falsch eingegeben."
        });
    }
}

export function isLoggedIn(req: Request, res: Response) {
    if (sessionExists(req.session)) {
        res.send({
            success: true,
            error: ""
        });
    } else {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
    }
}