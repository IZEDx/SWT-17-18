
import { DateTime, IDatabaseController, IEmployeeData } from "./interfaces";
import { Employee } from "./employee";
import { Event } from "./event";
import { readFile, createConnection } from "./utils";
import { escape, format, IConnection, IConnectionConfig } from "mysql";

export { escape, format, IConnectionConfig };

let mysqlConfig: IConnectionConfig;
try {
    mysqlConfig = require("../config.json").mysql;
} catch(err) {
    mysqlConfig = require("../config-sample.json").mysql;
}

export class DatabaseController implements IDatabaseController {
    private static instance: DatabaseController;
    private config: IConnectionConfig;
    private connection: IConnection;
    private dbname: string;

    private constructor(config: IConnectionConfig){
        this.config = config;
        this.dbname = this.config.database || "timetable";
        this.config.database = undefined;
    }

    static async singleton(): Promise<DatabaseController> {
        if (DatabaseController.instance === undefined) {
            DatabaseController.instance = new DatabaseController(mysqlConfig);
        }
        if (!await DatabaseController.instance.checkConnection()) {
            await DatabaseController.instance.connect();
        }

        return DatabaseController.instance;
    }

    checkConnection(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.connection === undefined) {
                resolve(false);
            } else {
                this.connection.ping(err => {
                    resolve(err === null);
                });
            }
        });
    }

    async connect(): Promise<IConnection|null> {
        try {
            console.log("Connecting to database...");
            this.connection = await createConnection(this.config);

            const schemasFound = await this.query<{name: string}[]>(`SELECT SCHEMA_NAME AS 'name' FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ${escape(this.dbname)}`);

            if (schemasFound.length === 0) {
                console.log("Setting up database...");

                const file = await readFile("./db.json");
                const statements: string[] = JSON.parse(file.toString());
                for (let s of statements) {
                    await this.query(s.replace(/%schema%/gi, this.dbname));
                }

                console.log("Database created!");
                return null;
            } else {
                await this.query(`USE ${this.connection.escapeId(this.dbname)}`)
            }

            console.log("Connected.");
            return this.connection;
        } catch(err) {
            console.error("Error connecting to DB:", err.sqlMessage ? err.sqlMessage : err);
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
            //console.log(employee.serialize());
            await this.query(format("INSERT INTO Employee SET ?", employee.serialize()));
            return true;
        } catch(err) {
            console.error("Error adding Employee to DB:", err.sqlMessage);
            return false;
        }
    }

    async addEventToDb(event: Event): Promise<boolean> {
        try {
            await this.query(format("INSERT INTO Event SET ?", event.serialize()));
            return true;
        } catch(err) {
            console.error("Error adding Event to DB:", err.sqlMessage);
            return false;
        }
    }

    //-------------------------------------------------------------------------------//


    async getEventsFromTimespan(from: DateTime, to: DateTime): Promise<Event[]> {
        return [];
    }

    async getEventsByName(name: String): Promise<Event[]> {
        return [];
    }

    async getEmployeeByAnyInfo(key: string, value: string): Promise<Employee[]> {
        try{
            return (await this.query<IEmployeeData[]>(`
                SELECT * FROM Employee WHERE ${this.connection.escapeId(key)} = ${escape(value)};
            `))
            .map(data => 
                new Employee(this, data, data.idEmployee)
            );
        } catch(err) {
            console.error("Error getting Employee from DB:", err.sqlMessage);
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