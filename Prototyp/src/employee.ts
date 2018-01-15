
import { DateTime, IAddress, IEmployee, IEvent } from "./interfaces";
import { DatabaseController, DBObject } from "./databasecontroller";
import { Request, Response, IRoute } from "express";

const db = DatabaseController.singleton();

export function EmployeeRoute(route: IRoute) {
    route.post((req, res) => {
        const b = req.body;
        const address: IAddress = {
            id: -1, 
            street: b.street,
            number: b.number,
            postcode: b.postcode,
            city: b.city
        }
        const employee = Employee.add(b.firstname, b.name, address, b.username, b.email, b.password,
                                        b.qualifications.split(","), b.driverLicense, b.isAdmin);
    });
}

export class Employee extends DBObject implements IEmployee {
    phone: string;

    constructor(
        public firstname: string, 
        public name: string, 
        public address : IAddress, 
        public username: string, 
        public email: string, 
        public password: string, 
        public qualifications: string, 
        public driverLicense : boolean, 
        public isAdmin : boolean
    ) {
        super();
    }

    static async add(firstname: string, name: string, address : IAddress, username: string, email: string, password: string,  qualifications: string[], driverLicense : boolean, isAdmin : boolean): Promise<Employee|null> {
        const employee = new Employee(firstname, name, address, username, email, password, qualifications.join(","), driverLicense, isAdmin);
        const success = await db.addEmployeeToDb(employee);
        return success ? employee : null;
    }

    delete() {

    }

    edit(firstname: string, name: string, address : IAddress, username: string, email: string, password: string,  qualifications: string[], driverLicense : boolean, isAdmin : boolean): void {
        
    }

    getHoursForWeek(timeInWeek: DateTime): number {
        return -1;
    }

    getHoursForMonth(timeInMonth: DateTime): number {
        return -1;
    }

    getAssignedEvents(): IEvent[] {
        return [];
    }

    getEventAtTime(time: DateTime): IEvent|null {
        return null;
    }
}
