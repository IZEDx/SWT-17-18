
import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { IEmployeeData, ISession } from "../interfaces";
import { Employee } from "../employee";
import { hash } from "bcrypt";
import { sessionExists } from "../utils";

export async function addEmployee(req: Request, res: Response) {
    const session: any|ISession = req.session;
    if (!sessionExists(session)) {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
        return;
    }

    const db = await DatabaseController.singleton();

    const caller = (await db.getEmployeeByAnyInfo("idEmployee", session.databaseID.toString()))[0];
    if (!caller.isAdmin) {
        res.send({
            success: false,
            error: "Keine Berechtigung."
        });
        return;
    }

    const data: IEmployeeData = req.body;
    data.password = await hash(data.password, 5);
    
    const employee = new Employee(db, data);
    const success = await db.addEmployeeToDb(employee);
    
    if (success) {
        res.send({
            success: true,
            error: ""
        });
    } else {
        res.send({
            success: false,
            error: "Employee konnte nicht hinzugefügt werden."
        });
    }

}