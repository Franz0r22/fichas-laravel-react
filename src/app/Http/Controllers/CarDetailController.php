<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;

class CarDetailController extends Controller
{
    public function getSingleCar(Request $request, $brand, $model, $autoid, Honeypot $honeypot)
    {
        try {
            $apiUrl = config('services.api.url_v2');
            $apiToken = config('services.api.token');
            $endpoint = 'car';

            $queryParams = [
                'dataBase' => 1,
                'autoid' => $autoid,
            ];
            $response = Http::withToken($apiToken)->get("$apiUrl/$endpoint", $queryParams);

            if ($response->successful()) {
                $data = $response->json();
                return Inertia::render('CarDetail', [
                    'data' => $data,
                    'honeypot' => $honeypot->toArray(),
                ]);
            } else {
                throw new \Exception('Failed to fetch data');
            }
        } catch (\Exception $e) {
            return Inertia::render('CarDetail', [
                'error' => $e->getMessage(),
                'honeypot' => $honeypot->toArray(),
            ]);
        }
    }
    public function getComparador(Request $request)
    {
        try {
            // Validar que el request contenga carIds como un array
            $request->validate([
                'carIds' => 'required|array',
                'carIds.*' => 'integer', // Cada elemento debe ser un número entero
            ]);

            $carIds = $request->input('carIds');
            $apiUrl = config('services.api.url_v2');
            $apiToken = config('services.api.token');
            $endpoint = 'car';

            $allCarsData = [];

            // Iterar sobre cada carId y hacer la petición a la API
            foreach ($carIds as $autoid) {
                $queryParams = [
                    'dataBase' => 1,
                    'autoid' => $autoid,
                ];

                $response = Http::withToken($apiToken)->get("$apiUrl/$endpoint", $queryParams);

                if ($response->successful()) {
                    $data = $response->json();
                    $allCarsData[] = $data; // Añadir la data de cada auto al array final
                } else {
                    throw new \Exception("Failed to fetch data for car ID: $autoid");
                }
            }

            // Retornar la respuesta con toda la data de los coches
            return response()->json([
                'data' => $allCarsData,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
