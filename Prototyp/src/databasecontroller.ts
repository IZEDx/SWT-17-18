
import { DateTime, IDatabaseController, DBAddressTable, DBEmployeeView } from "./interfaces";
import { Employee } from "./employee";
import { Event } from "./event";
import { readFile } from "./utils";
import { createConnection, IConnection, IConnectionConfig, escape, format } from "mysql";

export { escape, IConnectionConfig, format };

let controllerInstance: DatabaseController;
let mysqlConfig: IConnectionConfig;
try {
    mysqlConfig = require("../config.json").mysql;
} catch(err) {
    mysqlConfig = require("../config-sample.json").mysql;
}

function connect(config: IConnectionConfig): Promise<IConnection> {
    return new Promise<IConnection>((resolve, reject) => {
        const conn = createConnection(config);
        conn.connect(async err => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        });
    });
}

export class DatabaseController implements IDatabaseController {
    private config: IConnectionConfig;
    private connection: IConnection;

    private constructor(config: IConnectionConfig){
        this.config = config;
    }

    connected(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.connection === undefined) {
                resolve(false);
            } else {
                this.connection.ping(err => {
                    resolve(err === undefined);
                });
            }
        });
    }

    static async singleton(): Promise<DatabaseController> {
        if (controllerInstance === undefined) {
            controllerInstance = new DatabaseController(mysqlConfig);
        }
        if (!await controllerInstance.connected()) {
            await controllerInstance.connect();
        }

        return controllerInstance;
    }

    async connect(): Promise<IConnection|null> {
        try {
            console.log("Connecting to database...");
            this.connection = await connect(this.config);

            const schemasFound = await this.query<{name: string}[]>(`SELECT SCHEMA_NAME AS 'name' FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ${escape(this.config.database)}`);

            if (schemasFound.length === 0) {
                /*
                console.log("Setting up database...");
                const file = await readFile("./createDatabase.sql");
                await this.query(file.toString().replace(/%schema%/g, this.dbname));

                console.log("Database created!");
                */
                console.error("Database not found.");
                return null;
            }

            console.log("Connected.");
            return this.connection;
        } catch(err) {
            console.error("Error:", err);
            return null;
        }
    }

    query<T>(sql: string, ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if ( err === undefined || err === null ) {
                    resolve(results as T);
                } else {
                    reject(err);
                }
            });
        });
    }

    //-------------------------------------------------------------------------------//

    async addEmployeeToDb(employee: Employee): Promise<boolean> {
        try {
            await this.query(format("INSERT INTO Address SET ?", employee.address))
            await this.query(format("INSERT INTO Employee SET ?", employee.serialize()));
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    async addEventToDb(event: Event): Promise<boolean> {
        try {
            await this.query(format("INSERT INTO Event SET ?", event));
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    //-------------------------------------------------------------------------------//


    async getEventsFromTimespan(from: DateTime, to: DateTime): Promise<Event[]> {
        return [];
    }

    getEventsByName(name: String): Promise<Event[]> {
        return this.query<Event[]>(`SELECT * FROM Event WHERE name = '${escape(name)}';`);
    }

    async getEmployeeByAnyInfo(key: string, value: string): Promise<Employee[]> {
        try{
            const foundEmployees: DBEmployeeView[] = await this.query<DBEmployeeView[]>(`
                SELECT * FROM Employee 
                INNER JOIN Address ON Employee.Address_idAddress = Address.idAddress 
                WHERE \`${escape(key)}\` = '${escape(value)}';
            `);

            const dbc: DatabaseController = this;
            return foundEmployees.map(ev => {
                const address: DBAddressTable = {
                    idAddress: ev.idAddress,
                    street: ev.street,
                    number: ev.number,
                    postcode: ev.postcode,
                    city: ev.city
                }
                const employee = new Employee(dbc, ev.name, ev.surname, ev.phone, address, ev.username, ev.email, ev.password, ev.qualifications, ev.driverLicense, ev.isAdmin)
                employee.id = ev.idEmployee !== undefined ? ev.idEmployee : -1;
                return employee;
            });
        } catch(err) {
            console.error(err);
            return [];
        }
    }

    //-------------------------------------------------------------------------------//

    async removeEventFromDb(event: Event): Promise<boolean> {
        return false;
    }

    async removeEmployeeFromDb(employee: Employee): Promise<boolean> {
        return false;
    }

    //-------------------------------------------------------------------------------//

    async updateEmployee(employee: Employee): Promise<boolean> {
        return false;
    }

    async updateEvent(event: Event): Promise<boolean> {
        return false;
    }

    //-------------------------------------------------------------------------------//

    async getEventsFromEmployee(employee: Employee): Promise<Event[]> {
        return [];
    }

    async getEmployeesFromEvent(event: Event): Promise<Employee[]> {
        return [];
    }

}