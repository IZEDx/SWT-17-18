
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

    //const caller = (await db.getEmployees({key: "idEmployee", value: (session.employee.idEmployee || "").toString()},)) [0];
    if (!session.employee.isAdmin) {
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
            data: employee.serialize()
        });
    } else {
        res.send({
            success: false,
            error: "Employee konnte nicht hinzugefügt werden."
        });
    }

}

export async function getEmployees(req: Request, res: Response) {
    if (!sessionExists(req.session)) {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
        return;
    }

    const db = await DatabaseController.singleton();
    const emps = await db.getEmployees();
    
    res.send(emps.map(e => e.serialize()));
}