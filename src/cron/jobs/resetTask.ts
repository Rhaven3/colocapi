import {updateDataJson} from "../../utils/json.ts";
import * as path from "node:path";
import type {Task} from "../../types/task.ts";

export const resetTask = (id:string) => {
    const filePath = path.join(process.cwd(), 'src', 'assets','tasks.json');
    updateDataJson<Task>(filePath, (task) => {
        if (task.id === id) {
            return {
                ...task,
                done: false,
            }
        }
        return task
    })
}