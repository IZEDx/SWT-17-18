
export type DateTime = Date;

export enum RepetitionEnum {
    daily,
    weekdays,
    weekly,
    once
}

const excludeKeys = ["db", "id", "constructor"]
export abstract class IDBObject {
    constructor(protected db: IDatabaseController, public readonly id?: number) {
    }

    serialize(): {} {
        const keys = Object.getOwnPropertyNames(this)
            .filter(key => excludeKeys.indexOf(key) < 0);
        const data = {};

        for (const key of keys) {
            data[key] = this[key];
        }

        return data;
    };
}

export interface IEventData {
    idEvent?: number;
    name: string;
    description: string;
    begin: DateTime;
    end: DateTime;
    repetition: RepetitionEnum;
}
export interface IEvent extends IEventData, IDBObject {
    getAssignedEmployees() : Promise<IEmployee[]>;
}

export interface IEmployeeData {
    idEmployee?: number;
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
}

export interface IEmployee extends IEmployeeData, IDBObject {
    getHoursForWeek(timeInWeek: DateTime): number;
    getHoursForMonth(timeInMonth: DateTime): number;
    getAssignedEvents(): IEvent[];
    getEventAtTime(time: DateTime): IEvent|null;
}

export interface IDatabaseController {
    addEmployeeToDb(employee: IEmployee): Promise<boolean>;
    addEventToDb(event: IEvent): Promise<boolean>;

    getEventsFromTimespan(from: DateTime, to: DateTime): Promise<IEvent[]>;
    getEventsByName(name: string): Promise<IEvent[]>;
    getEmployees(where?: {key: string, value: string}, limit?: number): Promise<IEmployee[]>;

    removeEventFromDb(event: IEvent): Promise<boolean>;
    removeEmployeeFromDb(employee: IEmployee): Promise<boolean>;

    updateEmployee(employee: IEmployee): Promise<boolean>;
    updateEvent(event: IEvent): Promise<boolean>;

    getEventsFromEmployee(employee: IEmployee): Promise<IEvent[]>;
    getEmployeesFromEvent(event: IEvent): Promise<IEmployee[]>;
}

export interface ISession {
    employee: IEmployee;
}
