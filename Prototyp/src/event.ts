
import { DateTime, IEmployee, IEvent, RepetitionEnum} from "./interfaces";
import { DatabaseController, DBObject } from "./databasecontroller";

const db = DatabaseController.singleton();


export class Event extends DBObject implements IEvent {
    private constructor(
        public name: string, 
        public description: string, 
        public begin: DateTime, 
        public end: DateTime, 
        public repetition: RepetitionEnum
    ) {
        super();
    }

    static add(name : string, description : string, begin : Date, end : Date, rep: RepetitionEnum, employees: IEmployee[]): Event {
        const event = new Event(name, description, begin, end, rep);
        db.addEventToDb(event);
        return event;
    }

    delete() {

    }

    async edit(name: string, description: string, begin: Date, end: Date, rep: RepetitionEnum, employees: IEmployee[]): Promise<boolean> {
        return false;
    }

    async getAssignedEmployees(): Promise<IEmployee[]> {
        return [];
    }

}
