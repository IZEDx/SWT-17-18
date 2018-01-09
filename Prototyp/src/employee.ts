
import { DateTime, IAddress, IEmployee, IEvent } from "./interfaces";
import { DatabaseController, DBObject } from "./databasecontroller";

const db = DatabaseController.singleton();

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

    static add(firstname: string, name: string, address : IAddress, username: string, email: string, password: string,  qualifications: string[], driverLicense : boolean, isAdmin : boolean): Employee {
        const employee = new Employee(firstname, name, address, username, email, password, qualifications.join(","), driverLicense, isAdmin);
        db.addEmployeeToDb(employee);
        return employee;
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
