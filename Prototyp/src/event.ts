
import Employee from "./employee";


export class Event {
    private dbid : number;
    private name : string;
    private description : string;
    private begin : Date;
    private end : Date;
    private repetition : RepetitionEnum;
    private employees : Employee[];

    get id(){
        return this.dbid;
    }

    private constructor(name: string, description: string, begin: Date, end: Date, rep: RepetitionEnum) {

    }

    static add(name : string, description : string, begin : Date, end : Date, rep: RepetitionEnum, employees: Employee[]): Event {
      return null;
    }

    delete() {

    }

    edit(name: string, description: string, begin: Date, end: Date, rep: RepetitionEnum, employees: Employee[]) {

    }

    getAssignedEmployees(): Employee[] {
      return null;
    }

}
