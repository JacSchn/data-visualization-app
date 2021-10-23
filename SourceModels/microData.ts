import * as db from  "./database";

export async function getData():Promise<any> {
    let data: any = await db.getData("LED");
    return data;
}

export function setData(data:string, sensor:string):void {
    db.addData(data,sensor);
}

