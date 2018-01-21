
import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { IEmployeeData } from "../interfaces";
import { Employee } from "../employee";
import { hash } from "bcrypt";
import { sessionExists } from "../utils";

export async function addEmployee(req: Request, res: Response) {
    if (sessionExists(req)) {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
        return;
    }

    // TODO: isAdmin check

    const db = await DatabaseController.singleton();
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
            error: "Nicht eingeloggt."
        });
    }

}