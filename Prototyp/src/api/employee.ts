/*
export function EmployeeRoute(route: IRoute) {
    route.post((req, res) => {
        const b = req.body;
        const address: DBAddressTable = {
            idAddress: -1, 
            street: b.street,
            number: b.number,
            postcode: b.postcode,
            city: b.city
        }
        Employee.add(b.firstname, b.name, address, b.username, b.email, b.password,
                    b.qualifications.split(","), b.driverLicense, b.isAdmin);
    });
}*/
import { Request, Response } from "express";
import { DatabaseController } from "../databasecontroller";
import { DBAddressTable } from "../interfaces";
import { Employee } from "../employee";
import { hash } from "bcrypt";

export async function addEmployee(req: Request, res: Response) {
    if ((req.session as any).employee === undefined) {
        res.send({
            success: false,
            error: "Nicht eingeloggt."
        });
        return;
    }

    const db = await DatabaseController.singleton();
    const b = req.body;
    const address: DBAddressTable = {
        street: b.street,
        number: b.number,
        postcode: b.postcode,
        city: b.city
    }
    
    const employee = new Employee(
        db, b.name, b.surname, 
        b.phone, address, b.username, 
        b.email, await hash(b.password, 5), b.qualifications.join(","), 
        b.driverLicense, b.isAdmin);

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