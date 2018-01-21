
import { DateTime, IEmployee, IEvent, IDatabaseController, IDBObject, IEmployeeData } from "./interfaces";

export class Employee extends IDBObject implements IEmployee {
    forename: string;
    surname: string;
    dateOfBirth: DateTime;
    phone: string;
    qualifications: string;
    username: string;
    email: string;
    password: string;
    driverLicense: boolean;
    isAdmin: boolean;
    street: string;
    number: string;
    postcode: string;
    city: string;

    constructor(db: IDatabaseController, data: IEmployeeData, id?: number) {
        super(db, id);
        Object.assign(this, data);
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
