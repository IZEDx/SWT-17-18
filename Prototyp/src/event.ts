
import { DateTime, IEmployee, IEvent, RepetitionEnum, IDatabaseController, IDBObject, IEventData } from "./interfaces";

export class Event extends IDBObject implements IEvent {
    name : string;
    description : string;
    begin : DateTime;
    end : DateTime;
    repetition : RepetitionEnum;

    constructor(db: IDatabaseController, data: IEventData, id?: number) {
        super(db, id);
        Object.assign(this, data);
    }

    async getAssignedEmployees(): Promise<IEmployee[]> {
        return [];
    }

}
