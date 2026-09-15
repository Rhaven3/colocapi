import {getDataJson} from "../utils/json.ts";
import type {Task} from "../types/task.ts";
import cron from 'node-cron'
import {getISOWeek} from 'date-fns'
import {assignedAndResetTask} from "./jobs/assignedAndResetTask.ts";

// schedule all task reset
const tasks = getDataJson<Task[]>("tasks");
for (const task of tasks) {
    switch (task.recurrence) {
        case "bi-hebdo":
            cron.schedule("0 7 * * 1", () => {
                const weekNumber = getISOWeek(new Date())
                if (weekNumber % 2 === 0) {
                    console.log(`cron bi-hebdo, reset de la tache n°${task.id} et réassignation...`)
                    assignedAndResetTask(task.id)
                }
            })
            break
        case "tri-mensuel":
            cron.schedule("0 1 1 */3", () => {
                console.log(`cron trimestriel, reset de la tache n°${task.id} et réassignation...`)
                assignedAndResetTask(task.id)
            })
            break

        case "hebdo":
            cron.schedule("0 7 * * 1", () => {
                console.log(`cron hebdo, reset de la tache n°${task.id} et réassignation...`)
                assignedAndResetTask(task.id)
            })
            break
        case "mensuel":
            cron.schedule("0 1 1 * *", () => {
                console.log(`cron mensuel, reset de la tache n°${task.id} et réassignation...`)
                assignedAndResetTask(task.id)
            })
            break
        case "quotidien":
            cron.schedule("0 6 * * *", () => {
                console.log(`cron , reset de la tache n°${task.id} et réassignation...`)
                assignedAndResetTask(task.id)
            })
            break
    }
}
console.log("cron jobs initialised for every Task !!")