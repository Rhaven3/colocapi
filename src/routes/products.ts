import express, {type Express, type Request, type Response, type Router} from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import {getDataJson} from "../utils/json.ts";

const app: Express = express()
const productController: Router = app.router

const filePath = path.join(process.cwd(), 'src', 'assets','products.json');

productController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<any[]>("products"));
});

export default productController
