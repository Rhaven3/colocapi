import express, {type Express, type Request, type Response, type Router} from 'express';
import * as fs from "node:fs";
import * as path from "node:path";

const app: Express = express()
const reminderController: Router = app.router
const filePath = path.join(process.cwd(), 'src', 'assets','reminders.json');

reminderController.get('/', (req: Request, res: Response) => {
    const raw = fs.readFileSync(filePath, 'utf-8');
    res.status(200).send(JSON.parse(raw));
});

export default reminderController
