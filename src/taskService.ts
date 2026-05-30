import {type Task} from "./types.js"

export class TaskManager {
    private taskList : Task[];
    private currentID : number;
    
    private getNextID() : number {
        if (this.taskList.length === 0){
            return 1;
        }

        return Math.max(...this.taskList.map(task => task.ID)) + 1;

    }

    constructor(tasks: Task[] = []){
        this.taskList = tasks;
        this.currentID = this.getNextID();
    }

    addTask(title : string, dueDate : Date) : void {
        const creationDate : Date = new Date();
        
        const task : Task = {
            ID : this.currentID, 
            creationDate,
            dueDate,
            title,
            completed : false
        };

        this.taskList.push(task);
        this.currentID++;
            
    }

    removeTask(id : number) : boolean {
        const index : number = this.taskList.findIndex(task => task.ID === id);
        
        if (index === -1){
            return false;
        }

        this.taskList.splice(index, 1);

        return true;
    }



    tasksDue() : number {

        let numDue = 0;

        for (const task of this.taskList){
            if (!task.completed){
                numDue++;
            }
        }

        return numDue;
    }

    tasksOverdue() : number {
        const currentDate : Date = new Date();

        let numOverdue = 0;

        for (const task of this.taskList){
            if (!task.completed && task.dueDate < currentDate){
                numOverdue++;
            }
        }

        return numOverdue;

    }

    numberOfTasks() : number {
        return this.taskList.length;

    }

    getTasks() : Task[] {
        return [...this.taskList]
    }

    setComplete(id : number) : boolean {
        const task : Task | undefined = this.taskList.find(task => task.ID === id);
        
        if (!task){
            return false;
        }

        task.completed = true;
        return true;

    }

    setIncomplete(id : number) : boolean {
        const task : Task | undefined = this.taskList.find(task => task.ID === id);
        
        if (!task){
            return false;
        }

        task.completed = false;
        return true;
        
    }


}