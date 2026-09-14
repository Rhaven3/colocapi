import {getDataJson} from "../utils/json.ts";
import type {Task} from "../types/task.ts";
import cron from 'node-cron'
import {resetTask} from "./jobs/resetTask.ts";

// schedule all task reset
const tasks = getDataJson<Task[]>("task");
for (const task of tasks) {
    switch (task.recurrence) {
        case "bi-hebdo":
            cron.schedule("")
            break
        case "tri-mensuel":
            cron.schedule("0 0 1 */3", () => {
                resetTask(task.id)
            })
            break
    }
}