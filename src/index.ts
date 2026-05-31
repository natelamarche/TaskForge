import { type Task } from "./types.js"
import { TaskManager } from "./taskService.js"
import { loadTasks, saveTasks } from "./storage.js"


async function main(): Promise<void> {
    const tasks : Task[] = await loadTasks();
    const manager = new TaskManager(tasks);

    const [command, ...args] = process.argv.slice(2);

    try {
        if (command == "add"){
            const title : string | undefined = args[0];
            const dueDateInput : string | undefined = args[1];

            if (!title || !dueDateInput){
                console.log('"Usage: npm run dev add "Task title" "2026-06-01"')
                return;
            }

            const dueDate = new Date(dueDateInput);
            
            if (Number.isNaN(dueDate.getTime())){
                console.log("Invalid due date. Use Format YYYY-MM-DD.");
                return;
            }

            manager.addTask(title, dueDate);
            await saveTasks(manager.getTasks());
            
            console.log(`Added tasks ${title}`);
            return

        }

        if (command === "list") {
            const tasks = manager.getTasks();

            if (tasks.length === 0) {
                console.log("No tasks found.");
                return;
            }

            for (const task of tasks) {
                const status = task.completed ? "done" : "todo";
                console.log(`${task.ID}. [${status}] ${task.title} - due ${task.dueDate}`);
            }

            return;
        }

        if (command === "remove") {
            const idInput = args[0];

            if (!idInput) {
                console.log("Usage: npm run dev remove 1");
                return;
            }

            const id = Number(idInput);

            if (Number.isNaN(id)) {
                console.log("Invalid task ID.");
                return;
            }

            const removed = manager.removeTask(id);

            if (!removed) {
                console.log(`Task ${id} not found.`);
                return;
            }

            await saveTasks(manager.getTasks());
            console.log(`Removed task ${id}`);
            return;
        }

        if (command === "complete") {
            const idInput : string | undefined = args[0];

            if (!idInput) {
                console.log("Usage: npm run dev complete 1");
                return;
            }

            const id : number = Number(idInput);

            if (Number.isNaN(id)){
                console.log("Invalid task ID.");
                return;
            }

            manager.setComplete(id);
            await saveTasks(manager.getTasks());
            console.log(`Set complete task ${id}`);

        }

        if (command === "incomplete") {
            const idInput : string | undefined = args[0];

            if (!idInput) {
                console.log("Usage: npm run dev incomplete 1");
                return;
            }

            const id : number = Number(idInput);

            if (Number.isNaN(id)){
                console.log("Invalid task ID.");
                return;
            }

            manager.setIncomplete(id);
            await saveTasks(manager.getTasks());
            console.log(`Set incomplete task ${id}`);

        }

        if (command === "stats") {
            console.log(`Total tasks: ${manager.numberOfTasks()}`);
            console.log(`Tasks due: ${manager.tasksDue()}`);
            console.log(`Tasks overdue: ${manager.tasksOverdue()}`);
            return;
        }

        console.log("Available commands:");
        console.log('  npm run dev add "Task title" "2026-06-01"');
        console.log("  npm run dev list");
        console.log("  npm run dev remove 1");
        console.log("  npm run dev complete 1");
        console.log("  npm run dev incomplete 1");
        console.log("  npm run dev stats");


    } catch (error) {

        if (error instanceof Error) {
            console.error(error.message);

        } else {
            console.error("Unknown Error occured.");

        }
    }

}

main();