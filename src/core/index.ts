export function getFieldName<T extends object, K extends keyof T>(
    o: T,
    key: K
): K {
    return key;
}

