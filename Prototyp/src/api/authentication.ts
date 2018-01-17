import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { compare } from "bcrypt";

export async function login(req: Request, res: Response) {
    if ((req.session as any).employee !== undefined) {
        res.send({
            success: true,
            error: "Already logged in."
        });
        return;
    }

    const db = await DatabaseController.singleton();
    const emps = await db.getEmployeeByAnyInfo("username", req.body.username);

    if (emps.length > 0 && await compare(req.body.password, emps[0].password)) {
        (req.session as any).employee = emps[0];
        res.send({
            success: true,
            error: ""
        });
    } else {
        res.send({
            success: false,
            error: "Could not log in."
        });
    }
}

export function isLoggedIn(req: Request, res: Response) {
    if ((req.session as any).employee !== undefined) {
        res.send({
            success: true,
            error: ""
        });
    } else {
        res.send({
            success: false,
            error: "Not logged in."
        });
    }
}