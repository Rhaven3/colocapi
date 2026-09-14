import type {Task} from "../types/task.ts";
import * as fs from "node:fs";
import path from "node:path";

export function updateDataJson<T>(filePath:string, mapCallback:(obj:T) =>T) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const objs:T[] = JSON.parse(raw);

    const updatedObjs = objs.map(mapCallback)

    fs.writeFileSync(filePath, JSON.stringify(updatedObjs), "utf-8");
    return updatedObjs
}

export function getDataJson<T>(data:string):T {
    const filePath = path.join(process.cwd(), 'src', 'assets',`${data}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}