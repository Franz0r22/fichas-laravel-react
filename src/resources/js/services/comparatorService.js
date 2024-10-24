import axios from 'axios';

export const getComparatorData = async (carIds) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

    if (!csrfToken) {
        throw new Error('Token CSRF no encontrado');
    }

    if (!carIds.length) {
        throw new Error('No hay vehículos seleccionados para comparar');
    }

    try {
        const response = await axios.post(route("comparador"), { carIds }, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            throw new Error(`Error en la petición: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo sucedió en la configuración de la petición que provocó un error
            throw new Error('Error al configurar la petición');
        }
    }
};
