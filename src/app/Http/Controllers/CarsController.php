<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CarsController extends Controller
{
    public function getCarsForHome(Request $request)
    {
        return $this->fetchAutos($request, 'Home', 8); //TODO: Cambiar el 8 y el 500 por variable en .env
    }

    public function getCars(Request $request)
    {
        return $this->fetchAutos($request, 'Autos', 500);
    }

    private function fetchAutos(Request $request, $page, $pageSize)
    {
        $apiUrl = config('services.api.url');
        $apiToken = config('services.api.token');
        $endpoint = 'carDealers/stock';

        $pageNumber = 1;

        $queryParams = [
            'CLIENTEID' => env('APP_SUCURSALES'),
            'TABLA' => 1,
            'PageNumber' => $pageNumber,
            'PageSize' => $pageSize,
        ];

        $response = Http::withToken($apiToken)
            ->get("$apiUrl/$endpoint", $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            return Inertia::render($page, [
                'data' => $data,
            ]);
        } else {
            return Inertia::render($page, [
                'error' => 'Failed to fetch data'
            ]);
        }
    }

    public function getCarsTwo(Request $request)
    {
        return $this->fetchAutosTwo($request, 'Autos');
    }

    private function fetchAutosTwo(Request $request, $page)
    {
        $apiUrl = config('services.api.urlfichas');
        $apiToken = config('services.api.tokenfichas');
        $endpoint = 'autos';


        $queryParams = [
            'cliente' => env('APP_SUCURSALES'),
        ];

        $response = Http::withToken($apiToken)
            ->post("$apiUrl/$endpoint", $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            return Inertia::render($page, [
                'data' => $data,
            ]);
        } else {
            return Inertia::render($page, [
                'error' => 'Failed to fetch data'
            ]);
        }
    }

    public function getCarsThree(Request $request)
    {
        return $this->fetchAutosThree($request, 'Autos', 10);
    }

    private function fetchAutosThree(Request $request, $page, $quantity)
    {
        $apiUrl = config('services.api.urlfichasv2');
        $apiToken = config('services.api.tokenfichasv2');
        $endpoint = 'vehicles';
        $pageNumber = 1;

        $queryParams = [
            'idClient' => env('APP_SUCURSALES'),
            'page' => $pageNumber,
            'quantity' => $quantity,
        ];

        $response = Http::withToken($apiToken)
            ->get("$apiUrl/$endpoint", $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            // Transformar los datos
            $transformedData = $this->transformNewApiData($data);
            //dd($data);
            return Inertia::render($page, [
                'data' => $transformedData,
            ]);
        } else {
            return Inertia::render($page, [
                'error' => 'Failed to fetch data'
            ]);
        }
    }

    function transformNewApiData($newApiData)
    {
        return collect($newApiData['ads'])->map(function ($ad) {
            return [
                'nombre_cliente' => 'Desconocido',  // Datos que no están en la nueva API
                'clienteid' => 'N/A',
                'idauto' => $ad['ad']['identifier'],
                // 'codigo' => $ad['ad']['identifier'],  // Usar el mismo identificador si no hay un código
                // 'patente' => $ad['ad']['specification']['plate'],
                'marca' => $ad['ad']['specification']['brand']['name'] ?? 'Desconocido',
                'modelo' => $ad['ad']['specification']['model']['name'] ?? 'Desconocido',
                'version' => $ad['ad']['specification']['version'],
                'carroceria' => $ad['ad']['specification']['bodyWork']['name'] ?? 'Desconocido',
                'precio' => $ad['ad']['prices']['price'] ?? 0,
                'moneda' => $ad['ad']['prices']['currency'] ?? '$',
                'year' => $ad['ad']['specification']['year'],
                'color' => $ad['ad']['specification']['color'] ?? 'Desconocido',
                'combustible_nombre' => $ad['ad']['specification']['fuel']['name'] ?? 'Desconocido',
                'transmision_nombre' => $ad['ad']['specification']['transmission']['name'] ?? 'Desconocido',
                'kms' => $ad['ad']['specification']['mileage'],
                'fotos' => implode(', ', $ad['ad']['meddia']),  // Convierte el array de imágenes a una cadena
                'titulo_etiqueta' => $ad['ad']['ribbon']['name'] ?? '',
                'color_etiqueta' => '#ffffff',  // Puedes asignar un valor predeterminado si no está disponible
            ];
        })->toArray();
    }
}
