// src/index.ts

import {getFieldName} from "./core";

/**
 * json to csv
 * provide as actual parameters {jsonObjectsArray} as array of json objects
 * provide as actual parameters {jsonKeyStructureNames} an array of key of jsonObjectsArray's json objects
 */
export async function jsonToCsv(
    jsonObjectsArray: any[],
    jsonKeyStructureNames: string[],
): Promise<string> {


    const csvHeader = jsonObjectsArray.map((value, index) => {
        if (index === 0) {
            return getFieldName(value, jsonKeyStructureNames[index].trim());
        }
        return '';
    }).filter((value) => value !== '').join();


    // join header and body, and break into separate lines
    const itemsArray: string[] = [];
    jsonObjectsArray.forEach((value) => {
        let partialArr : any[] = [];
        for(const key of jsonKeyStructureNames) {
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
    jsonObjectsArray: any[],
    jsonKeyStructureNames: string[],
): Promise<any> {
}
