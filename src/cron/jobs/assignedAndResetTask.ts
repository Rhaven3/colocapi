import {getDataJson, updateDataJson} from "../../utils/json.ts";
import type {Roommate} from "../../types/roommate.ts";
import type {Task} from "../../types/task.ts";
import path from "node:path";

export function assignedAndResetTask(id: number): any {
    const filePath = path.join(process.cwd(), 'src', 'assets', 'tasks.json');
    const tasks = getDataJson<Task[]>("tasks");
    const targetTask = tasks.find((task) => task.id === id);
    if (!targetTask?.done) {
        console.log("task not done !")
        return
    }
    const roommates = getDataJson<Roommate[]>("roommates");

    updateDataJson<Task>(filePath, (task) => {
        if (task.id === targetTask.id) {
            return {
                ...task,
                done: false,
                roommateAssigned: (((task.roommateAssigned ?? -1) + 1) % roommates.length) + 1,
            }
        }
        return task
    })
    console.log(`Assigned and Reset task n°${id} completed !`)
}