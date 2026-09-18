import express, {type Express, type Request, type Response, type Router} from 'express';
import {appendDataJson, getDataJson} from "../utils/json.ts";
import type {Product, ProductDTO} from "../types/product.ts";

const app: Express = express()
const productController: Router = app.router
const entity = "products"


// GET ALL
productController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<Product[]>(entity));
});

// CREATE
productController.post('/', (req: Request, res: Response) => {
    let products = getDataJson<Product[]>(entity);
    const productDto = req.body as ProductDTO;
    const newProduct: Product = {
        ...productDto,
        id: products.length + 1,
    }

    products = appendDataJson<Product>(entity, newProduct);
    res.status(201).send(products);
})

export default productController
