
import { DateTime, IEmployee, IEvent, RepetitionEnum, IDatabaseController } from "./interfaces";

export class Event implements IEvent {
    id: number;

    private constructor(
        public db: IDatabaseController,
        public name: string, 
        public description: string, 
        public begin: DateTime, 
        public end: DateTime, 
        public repetition: RepetitionEnum
    ) {
    }

    static async add(db: IDatabaseController, name : string, description : string, begin : Date, end : Date, rep: RepetitionEnum, employees: IEmployee[]): Promise<Event|null> {
        const event = new Event(db, name, description, begin, end, rep);
        const success = await db.addEventToDb(event);
        return success ? event : null;
    }

    async delete() {

    }

    async edit(name: string, description: string, begin: Date, end: Date, rep: RepetitionEnum, employees: IEmployee[]): Promise<boolean> {
        return false;
    }

    async getAssignedEmployees(): Promise<IEmployee[]> {
        return [];
    }

}
