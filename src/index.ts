// src/index.ts
/**
 * json to csv
 * provide as actual parameters {jsonObjectsArray} as array of json objects
 * provide as actual parameters {jsonKeyStructureNames} an array of key of jsonObjectsArray's json objects
 */
export async function jsonToCsv(
    jsonObjectsArray: any[],
    jsonKeyStructureNames: string[],
): Promise<string> {

    const csvHeader = jsonKeyStructureNames.join(',');
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
/**
 * csv
 * provide as actual parameters {csvData} a unix formatted string like csv
 * provide as actual parameters {jsonKeyStructureNames} an array of key of jsonObjectsArray's json objects
 */
export async function csvToJson(
    csvData: string,
    jsonKeyStructureNames: string[],
): Promise<any[]> {

    const rows = csvData.trim().split('\n');

    let finalArray: any[] = [];

    rows.map((value, index) => {
        if(index!==0){
            const arrOfValues = value.split(',');
            const rowObject: { [key: string]: string } = {};
            jsonKeyStructureNames.forEach((key, index) => {
                rowObject[key] = arrOfValues[index] ? arrOfValues[index] : '';
            })
            finalArray.push(rowObject);
        }
    })
 return finalArray;
}
