import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { compare } from "bcrypt";

export async function login(req: Request, res: Response) {
    if ((req.session as any).id !== undefined) {
        res.send({
            success: true,
            error: "Bereits eingeloggt."
        });
        return;
    }

    const db = await DatabaseController.singleton();
    const emps = await db.getEmployeeByAnyInfo("username", req.body.username);

    if (emps.length > 0 && await compare(req.body.password, emps[0].password)) {
        (req.session as any).id = emps[0].id;
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
    if ((req.session as any).id !== undefined) {
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