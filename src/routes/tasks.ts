import express, {type Express, type Request, type Response, type Router} from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import type {Task} from "../types/task.ts";
import {getDataJson, updateDataJson} from "../utils/json.ts";

const app: Express = express()
const taskController: Router = app.router

const filePath = path.join(process.cwd(), 'src', 'assets','tasks.json');

taskController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<Task[]>("tasks"));
});

taskController.patch('/:id/toggle', (req: Request, res: Response) => {
    const updatedTask = updateDataJson<Task>(filePath, (task) => {
        if (task.id === req.params.id) {
            return {
                ...task,
                done: !task.done,
            }
        }
        return task;
    })
    res.status(200).send(JSON.stringify(updatedTask));
})

export default taskController
