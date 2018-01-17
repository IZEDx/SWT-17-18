
export type DateTime = Date;

export enum RepetitionEnum {
    daily,
    weekdays,
    weekly,
    once
}

export interface DBEventTable {

}

export interface IEvent extends IDBObject {
    name : string;
    description : string;
    begin : Date;
    end : Date;
    repetition : RepetitionEnum;

    delete(): void;
    edit(name: string, description : string, begin: DateTime, end : DateTime, repetition : RepetitionEnum, employees : IEmployee[]): Promise<boolean>;
    getAssignedEmployees() : Promise<IEmployee[]>;
}

export interface DBEmployeeView {
    idEmployee?: number,
    name: string, 
    surname: string;
    phone: string;
    qualifications: string;
    username: string;
    email: string;
    password: string;
    driverLicense: boolean;
    isAdmin: boolean;
    idAddress: number;
    street: string;
    number: string;
    postcode: string;
    city: string;
}

export interface IEmployee extends IDBObject {
    name: string;
    surname: string;
    phone: string;
    address: DBAddressTable;
    qualifications: string;
    username: string;
    email: string;
    password: string;
    driverLicense: boolean;
    isAdmin: boolean;

    delete(): void;
    edit(firstname: string, name: string, address : DBAddressTable, username: string, email: string, password: string,  qualifications: string[], driverLicence : boolean, isAdmin : boolean): void;
    getHoursForWeek(timeInWeek: Date): number;
    getHoursForMonth(timeInMonth: Date): number;
    getAssignedEvents(): IEvent[];
    getEventAtTime(time: DateTime): IEvent|null;
}

export interface DBAddressTable {
    idAddress?: number;
    street: string;
    number: string;
    postcode: string;
    city: string;
}

export interface IDatabaseController {
    addEmployeeToDb(employee: IEmployee): Promise<boolean>;
    addEventToDb(event: IEvent): Promise<boolean>;

    getEventsFromTimespan(from: DateTime, to: DateTime): Promise<IEvent[]>;
    getEventsByName(name: string): Promise<IEvent[]>;
    getEmployeeByAnyInfo(key: string, value: string): Promise<IEmployee[]>;

    removeEventFromDb(event: IEvent): Promise<boolean>;
    removeEmployeeFromDb(employee: IEmployee): Promise<boolean>;

    updateEmployee(employee: IEmployee): Promise<boolean>;
    updateEvent(event: IEvent): Promise<boolean>;

    getEventsFromEmployee(employee: IEmployee): Promise<IEvent[]>;
    getEmployeesFromEvent(event: IEvent): Promise<IEmployee[]>;
}

export interface IDBObject {
    id?: number;
    db: IDatabaseController;
}
