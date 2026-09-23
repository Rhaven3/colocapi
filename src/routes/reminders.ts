import express, {type Express, type Request, type Response, type Router} from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import {getDataJson} from "../utils/json.ts";

const app: Express = express()
const reminderController: Router = app.router
const entity = "reminders"

reminderController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<string[]>(entity));
});

export default reminderController
