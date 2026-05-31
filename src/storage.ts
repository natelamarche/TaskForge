import { readFile, writeFile } from "fs/promises"
import { type Task } from "./types.js"

const FILE_PATH = "tasks.json"

export async function loadTasks() : Promise<Task[]> {
    try {
        const data : string = await readFile(FILE_PATH, "utf-8");
        const tasks : Task[] = JSON.parse(data) as Task[];

        return tasks.map(task => ({
            ...task,
            creationDate: new Date(task.creationDate),
            dueDate: new Date(task.dueDate)
        }));

    } catch {
        return [];

    } 
}

export async function saveTasks(tasks : Task[]) : Promise<void> {
    await writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8"); 

}