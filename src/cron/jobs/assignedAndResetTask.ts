import {getDataJson, updateDataJson} from "../../utils/json.ts";
import type {Roommate} from "../../types/roommate.ts";
import type {Task} from "../../types/task.ts";

export function assignedAndResetTask(id: number): any {
    const tasks = getDataJson<Task[]>("tasks");
    const targetTask = tasks.find((task) => task.id === id);
    if (!targetTask?.done) {
        console.log("task not done !")
        return
    }
    const roommates = getDataJson<Roommate[]>("roommates");

    updateDataJson<Task>("tasks", (task) => {
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