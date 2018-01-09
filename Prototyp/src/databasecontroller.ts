
import { DateTime, IAddress, IDatabaseController, IEmployee, IEvent } from "./interfaces";
import { createConnection, IConnection, IConnectionConfig, escape, format, IError } from "mysql";

const config: IConnectionConfig = ((require as Function)("../package.json")).config.mysql;

let controllerInstance: DatabaseController;

export { escape, IConnectionConfig, format };

export class DatabaseController implements IDatabaseController {
    private connection: IConnection;

    private constructor(config: IConnectionConfig){
        this.connection = createConnection(config)
        this.connection.connect();
    }

    static singleton(): DatabaseController {
        if (controllerInstance === undefined) {
            controllerInstance = new DatabaseController(config);
        }

        return controllerInstance;
    }

    query<T>(sql: string, ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if ( err !== undefined ) {
                    reject(err);
                } else {
                    resolve(results as T);
                }
            });
        });
    }

    //-------------------------------------------------------------------------------//

    async addEmployeeToDb(employee: IEmployee): Promise<boolean> {
        try {
            await this.query(format("INSERT INTO Employee SET ?", employee));
            return true;
        } catch(err) {
            return false;
        }
    }

    async addEventToDb(event: IEvent): Promise<boolean> {
        try {
            await this.query(format("INSERT INTO Event SET ?", event));
            return true;
        } catch(err) {
            return false;
        }
    }

    //-------------------------------------------------------------------------------//


    async getEventsFromTimespan(from: DateTime, to: DateTime): Promise<IEvent[]> {
    }

    getEventsByName(name: String): Promise<IEvent[]> {
        return this.query<IEvent[]>(`SELECT * FROM Event WHERE name = '${escape(name)}';`);
    }

    async getEmployeeByAnyInfo(info: String): Promise<IEmployee[]> {

    }

    //-------------------------------------------------------------------------------//

    async removeEventFromDb(event: IEvent): Promise<boolean> {

    }

    async removeEmployeeFromDb(employee: IEmployee): Promise<boolean> {

    }

    //-------------------------------------------------------------------------------//

    async updateEmployee(employee: IEmployee): Promise<boolean> {

    }

    async updateEvent(event: IEvent): Promise<boolean> {

    }

    //-------------------------------------------------------------------------------//

    async getEventsFromEmployee(employee: IEmployee): Promise<IEvent[]> {

    }

    async getEmployeesFromEvent(event: IEvent): Promise<IEmployee[]> {

    }

}