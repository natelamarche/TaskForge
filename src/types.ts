export interface Task {
    readonly ID: number,
    readonly creationDate: Date,
    dueDate: Date,
    title: string
    completed: boolean

}

