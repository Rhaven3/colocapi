import express, {type Express, type Request, type Response, type Router} from 'express';
import {appendDataJson, getDataJson} from "../utils/json.ts";
import type {Receipt} from "../types/Receipt.ts";

const app: Express = express()
const receiptController: Router = app.router
const entity = 'receipts'

// READ
receiptController.get('/', (req: Request, res: Response) => {
    res.status(200).send(getDataJson<Receipt>(entity));
});

// CREATE
receiptController.post('/', (req: Request, res: Response) => {
    const newReceipt = req.body as Receipt;

    const receipts = appendDataJson<Receipt>(entity, newReceipt);
    res.status(201).send(receipts);
})

export default receiptController
