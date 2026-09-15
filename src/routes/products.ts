import express, {type Express, type Request, type Response, type Router} from 'express';
import * as path from "node:path";
import {getDataJson} from "../utils/json.ts";
import type {Product} from "../types/product.ts";

const app: Express = express()
const productController: Router = app.router

const filePath = path.join(process.cwd(), 'src', 'assets', 'products.json');

productController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<Product[]>("products"));
});

export default productController
