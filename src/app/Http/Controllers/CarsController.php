<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CarsController extends Controller
{
    public function getCarsForHome(Request $request)
    {
        return $this->fetchAutos($request, 'Home', 4); //TODO: Cambiar el 4 y el 500 por variable en .env
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
                'layoutData' => ['carData' => $data]
            ]);
        } else {
            return Inertia::render($page, [
                'error' => 'Failed to fetch data'
            ]);
        }
    }
}
