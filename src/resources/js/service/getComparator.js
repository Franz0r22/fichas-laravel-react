export default async function getComparator(carId) {
    try {
        const apiUrl = "https://api.servicesdtk2.cl/v2";
        const apiToken = "b00b9b5f-487a-4331-a4a5-3c57cbd183a3";
        const endpoint = "car";

        // Parámetros de consulta
        const queryParams = new URLSearchParams({
            dataBase: 1,
            autoid: carId,
        });

        // Realizamos la solicitud con fetch
        const response = await fetch(
            `${apiUrl}/${endpoint}?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json(); // Parseamos la respuesta JSON
        return { data }; // Devolvemos los datos obtenidos
    } catch (error) {
        console.error("Error fetching car details:", error);
        return { error: error.message }; // Devolvemos el error si ocurre
    }
}
