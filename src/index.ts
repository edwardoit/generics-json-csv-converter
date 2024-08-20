// src/index.ts

import {getFieldName} from "./core";

export async function jsonToCsv(
    inputFieldsName: any[],
    keyNames: string[],
): Promise<string> {


    const csvHeader = inputFieldsName.map((value, index) => {
        if (index === 0) {
            return getFieldName(value, keyNames[index].trim());
        }
        return '';
    }).filter((value) => value !== '').join();


    // join header and body, and break into separate lines
    const itemsArray: string[] = [];
    inputFieldsName.forEach((value) => {
        let partialArr : any[] = [];
        for(const key of keyNames) {
            partialArr.push(value[`${key}`]);

        }
        itemsArray.push(
            [
                ...partialArr
            ].join()
        );
        //remove partial
        partialArr.pop();
    });


    return [csvHeader, ...itemsArray].join("\r\n");
}

export async function csvToJson(
    inputFieldsName: any[],
    keyNames: string[],
): Promise<any> {
}
