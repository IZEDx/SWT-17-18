
import { DateTime, DBAddressTable, IEmployee, IEvent, IDatabaseController } from "./interfaces";

export class Employee implements IEmployee {
    id: number;

    constructor(
        public db: IDatabaseController,
        public name: string, 
        public surname: string, 
        public phone: string,
        public address : DBAddressTable, 
        public username: string, 
        public email: string, 
        public password: string, 
        public qualifications: string, 
        public driverLicense : boolean, 
        public isAdmin : boolean
    ) {
    }

    static async add(db: IDatabaseController, name: string, surname: string, phone: string, address: DBAddressTable, username: string, email: string, password: string,  qualifications: string[], driverLicense : boolean, isAdmin : boolean): Promise<Employee|null> {
        const employee = new Employee(db, name, surname, phone, address, username, email, password, qualifications.join(","), driverLicense, isAdmin);
        const success = await db.addEmployeeToDb(employee);
        return success ? employee : null;
    }

    delete() {

    }

    edit(name: string, surname: string, address: DBAddressTable, username: string, email: string, password: string,  qualifications: string[], driverLicense : boolean, isAdmin : boolean): void {
        
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

    serialize() {
        const res: any = {
            name: this.name,
            surname: this.surname,
            phone: this.phone,
            qualifications: this.qualifications,
            username: this.username,
            email: this.email,
            password: this.password,
            driverLicense: this.driverLicense,
            isAdmin: this.isAdmin
        }

        if (this.address !== undefined) {
            res.Address_idAddress = this.address.idAddress;
        }

        if (this.id !== undefined) {
            res.idEmployee = this.id;
        }

        return res;
    }
}
