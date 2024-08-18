/**
 * Convierte un número a entero y lo formatea usando toLocaleString.
 * @param {number|string} value - El valor a formatear. Puede ser un número o un string que represente un número.
 * @param {string} [locale='es-ES'] - La configuración regional para el formato.
 * @param {Object} [options={}] - Opciones adicionales para el formato.
 * @returns {string} - El número formateado como una cadena.
 */
export function formatNumber(value, locale = "es-ES", options = {}) {
    
    const number = parseInt(value, 10);
    
    if (isNaN(number)) {
        throw new Error("El valor proporcionado no es un número válido.");
    }

    return number.toLocaleString(locale, options);
}
