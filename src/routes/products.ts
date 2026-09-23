import express, {type Express, type Request, type Response, type Router} from 'express';
import {appendDataJson, getDataJson, updateDataJson} from "../utils/json.ts";
import type {PatchQuantityProductValue, Product, ProductCategory, ProductDTO} from "../types/product.ts";
import type {Receipt} from "../types/Receipt.ts";

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

// PATCH QUANTITY
productController.patch(`/:id`, (req: Request, res: Response) => {
    const patchValue = req.body as PatchQuantityProductValue;
    const id = req.params.id as string;
    const products = getDataJson<Product[]>(entity).filter((p) => p.category === parseInt(id))

    for (const product of products) {
        const tmpQuantity = product.quantity
        product.quantity -= patchValue.soustraction
        patchValue.soustraction -= tmpQuantity

        if (product.quantity >= 0) break;
        product.quantity = 0
    }

    const updatedProducts = updateDataJson<Product>(entity, (product, index) => {
        const modifiedProduct = products.find((p) => p.id === product.id)
        if (modifiedProduct) {
            return {
                ...product,
                quantity: modifiedProduct.quantity
            }
        }
        return product;
    }, (product) => product.quantity > 0)

    res.status(200).send(updatedProducts);
})

export default productController
