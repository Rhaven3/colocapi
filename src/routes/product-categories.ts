import express, {type Express, type Request, type Response, type Router} from 'express';
import * as path from "node:path";
import {getDataJson} from "../utils/json.ts";
import type {ProductCategory} from "../types/product.ts";

const app: Express = express()
const productCategoryController: Router = app.router

const filePath = path.join(process.cwd(), 'src', 'assets', 'product-categories.json');

productCategoryController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<ProductCategory[]>("product-categories"));
});

export default productCategoryController

