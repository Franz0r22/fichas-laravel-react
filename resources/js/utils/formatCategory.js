export const formatCategory = (category) => {
    if (Array.isArray(category)) {
        // Si es un array, aplica la función recursivamente a cada elemento
        return category.map((item) => formatCategory(item));
    }
    if (typeof category !== "string") {
        // Si no es un string, devuelve un string vacío
        return "";
    }
    // Si es un string, aplica el reemplazo
    return category.replace("Suv / Station Wagon", "Suv");
};