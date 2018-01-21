
import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { IEmployeeData, ISession } from "../interfaces";
import { Employee } from "../employee";
import { hash } from "bcrypt";
import { sessionExists } from "../utils";

/**
 * POST /api/employees
 * Body: {IEmployeeData}
 */
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

/**
 * GET /api/employees?key=xx&value=xx&limit=xx
 */
export async function getEmployees(req: Request, res: Response) {
    if (!sessionExists(req.session)) {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
        return;
    }

    let where: undefined|{key: string, value: string};
    if (req.query.key !== undefined && req.query.value !== undefined) {
        where = {key: req.query.key, value: req.query.value};
    }

    const db = await DatabaseController.singleton();
    const emps = await db.getEmployees(where, req.query.limit !== undefined ? parseInt(req.query.limt) : undefined);
    
    res.send(emps.map(e => e.serialize()));
}