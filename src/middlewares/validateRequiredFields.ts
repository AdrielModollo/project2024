export function validateRequiredFields(
    object: Record<string, any>,
    requiredFields: string[]
): string[] {
    return requiredFields.filter(
        (field) => !object[field] || String(object[field]).trim() === ''
    );
}
