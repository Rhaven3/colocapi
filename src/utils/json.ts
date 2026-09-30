import * as fs from "node:fs";
import path from "node:path";

function getDataFilePath(data: string): string {
    const dataDirectory = process.env.DATA_DIR || path.join(process.cwd(), "src", "assets");
    return path.join(dataDirectory, `${data}.json`);
}

export function updateDataJson<T>(data: string, mapCallback: (obj: T, index: number) => T, filterCallback?: (obj: T, index: number) => boolean) {
    const filePath = getDataFilePath(data);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const objs: T[] = JSON.parse(raw);

    let updatedObjs = objs.map(mapCallback)
    if (filterCallback) {
        updatedObjs = updatedObjs.filter(filterCallback)
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedObjs), "utf-8");
    return updatedObjs
}

export function getDataJson<T>(data: string): T {
    const filePath = getDataFilePath(data);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

export function appendDataJson<T>(data: string, obj: T) {
    const filePath = getDataFilePath(data);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const objs: T[] = JSON.parse(raw);

    objs.push(obj);

    fs.writeFileSync(filePath, JSON.stringify(objs), "utf-8");
    return objs;
}
