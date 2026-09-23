import express, {type Express, type Request, type Response, type Router} from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import {getDataJson} from "../utils/json.ts";
import type {Roommate} from "../types/roommate.ts";

const app: Express = express()
const roommateController: Router = app.router
const entity = "roommates"


roommateController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<Roommate[]>(entity));
});

export default roommateController
