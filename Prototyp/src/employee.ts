
import { Event } from "./event";


export class Employee {
    firstname: string;
    name: string;
    phone: string;
    address: IAddress;
    qualifications: string;
    username: string;
    email: string;
    password: string;
    driverLicense: boolean;
    isAdmin: boolean;

    public constructor(firstname: string, name: string, address : IAddress, username: string, email: string, password: string, qualifications: string[], driverLicence : boolean, isAdmin : boolean) {

    }

    public delete() {

    }

    public add(firstname: string, name: string, address : IAddress, username: string, email: string, password: string,  qualifications: string[], driverLicence : boolean, isAdmin : boolean): Employee {
        const employee = new Employee(firstname, name, address, username, email, password, qualifications, driverLicence, isAdmin);

        return employee;
    }

    public edit(firstname: string, name: string, address : IAddress, username: string, email: string, password: string,  qualifications: string[], driverLicence : boolean, isAdmin : boolean): void {
        
    }

    public getHoursForWeek(timeInWeek: Date): number {

    }

    public getHoursForMonth(timeInMonth: Date): number {

    }

    public getAssignedEvents(): Event[] {

    }
}
