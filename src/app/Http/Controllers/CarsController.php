<?php

namespace App\Http\Controllers;

use App\Services\CarDataTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CarsController extends Controller
{
    protected CarDataTransformer $transformer;

    public function __construct(CarDataTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function getCarsForHome(Request $request)
    {
        return $this->fetchAutos($request, 'Home', 8); //TODO: Cambiar el 8 y el 500 por variable en .env
    }

    public function getCars(Request $request)
    {
        return $this->fetchAutos($request, 'Autos', 1000);
    }


    private function fetchAutos(Request $request, $page, $quantity)
    {
        $cacheKey = "cars_{$page}_{$quantity}";
        $cacheTTL = now()->addMinutes(10);

        $cachedData = cache()->remember($cacheKey, $cacheTTL, function () use ($quantity) {
            $apiUrl = config('services.api.urlfichasv2');
            $apiToken = config('services.api.tokenfichasv2');
            $endpoint = 'vehicles';
            $pageNumber = 1;

            $queryParams = [
                'idClient' => env('APP_SUCURSALES'),
                'page' => $pageNumber,
                'quantity' => $quantity,
            ];

            $response = Http::withToken($apiToken)->get("$apiUrl/$endpoint", $queryParams);

            if ($response->successful()) {
                return $this->transformer->transformNewApiData($response->json());
            } else {
                return null;
            }
        });

        if ($cachedData) {
            return Inertia::render($page, ['data' => $cachedData]);
        } else {
            return Inertia::render($page, ['error' => 'Failed to fetch data']);
        }
    }
}
