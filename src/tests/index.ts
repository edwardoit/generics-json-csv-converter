import {csvToJson, jsonToCsv} from '../index';

describe('jsonToCsv', () => {
    const normalizeLineEndings = (text: string) => text.replace(/\r\n/g, '\n');

    it('should convert JSON objects array to CSV format', async () => {
        const jsonObjectsArray = [
            { name: 'John', age: 25, city: 'New York' },
            { name: 'Jane', age: 28, city: 'Los Angeles' },
            { name: 'Mike', age: 32, city: 'Chicago' },
        ];

        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedCsv =
            `name,age,city\nJohn,25,New York\nJane,28,Los Angeles\nMike,32,Chicago`;

        const result = await jsonToCsv(jsonObjectsArray, jsonKeyStructureNames);

        // Normalize both the result and expected CSVs to use '\n' line endings
        expect(normalizeLineEndings(result)).toBe(expectedCsv);
    });

    it('should handle empty JSON array and key structure', async () => {
        const jsonObjectsArray: any[] = [];
        const jsonKeyStructureNames: string[] = [];

        const expectedCsv = '';

        const result = await jsonToCsv(jsonObjectsArray, jsonKeyStructureNames);

        expect(result).toBe(expectedCsv);
    });

    it('should handle missing keys in JSON objects', async () => {
        const jsonObjectsArray = [
            { name: 'John', age: 25 },
            { name: 'Jane', age: 28, city: 'Los Angeles' },
            { name: 'Mike', city: 'Chicago' },
        ];

        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedCsv =
            `name,age,city\nJohn,25,\nJane,28,Los Angeles\nMike,,Chicago`;

        const result = await jsonToCsv(jsonObjectsArray, jsonKeyStructureNames);

        expect(normalizeLineEndings(result)).toBe(expectedCsv);
    });
});


describe('csvToJson', () => {
    it('should convert CSV data to JSON objects', async () => {
        const csvData = `name,age,city
John,25,New York
Jane,28,Los Angeles
Mike,32,Chicago`;

        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedJson = [
            { name: 'John', age: '25', city: 'New York' },
            { name: 'Jane', age: '28', city: 'Los Angeles' },
            { name: 'Mike', age: '32', city: 'Chicago' }
        ];

        const result = await csvToJson(csvData, jsonKeyStructureNames);
        expect(result).toEqual(expectedJson);
    });

    it('should handle empty CSV data', async () => {
        const csvData = '';
        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedJson: any[] = [];

        const result = await csvToJson(csvData, jsonKeyStructureNames);
        expect(result).toEqual(expectedJson);
    });

    it('should handle CSV data with missing keys', async () => {
        const csvData = `name,age,city
John,25
Jane,28,Los Angeles
Mike,32,Chicago`;

        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedJson = [
            { name: 'John', age: '25', city: '' },
            { name: 'Jane', age: '28', city: 'Los Angeles' },
            { name: 'Mike', age: '32', city: 'Chicago' }
        ];

        const result = await csvToJson(csvData, jsonKeyStructureNames);
        expect(result).toEqual(expectedJson);
    });

    it('should handle extra columns in CSV data', async () => {
        const csvData = `name,age,city,extra
John,25,New York,ExtraValue
Jane,28,Los Angeles,ExtraValue
Mike,32,Chicago,ExtraValue`;

        const jsonKeyStructureNames = ['name', 'age', 'city'];

        const expectedJson = [
            { name: 'John', age: '25', city: 'New York' },
            { name: 'Jane', age: '28', city: 'Los Angeles' },
            { name: 'Mike', age: '32', city: 'Chicago' }
        ];

        const result = await csvToJson(csvData, jsonKeyStructureNames);
        expect(result).toEqual(expectedJson);
    });
});

