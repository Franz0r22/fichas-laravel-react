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
                return $this->transformNewApiData($response->json());
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


    function transformNewApiData($newApiData)
    {
        return [
            'page' => $newApiData['page'],
            'showing' => $newApiData['showing'],
            'total' => $newApiData['total'],
            'ads' => collect($newApiData['ads'])->map(function ($adData) {
                $ad = $adData['ad'];
                return [
                    'carId' => $ad['identifier'],
                    'keyword' => $ad['keyword'],
                    'publicationDate' => $ad['publicationDate'],
                    'price' => $ad['prices']['price'],
                    'currency' => $ad['prices']['currency'],
                    'legal1' => $ad['prices']['legal1'],
                    'legal2' => $ad['prices']['legal2'],
                    'legal3' => $ad['prices']['legal3'],
                    'ribbonId' => $ad['ribbon']['id'],
                    'ribbonName' => $ad['ribbon']['name'],
                    'ribbonColor' => $ad['ribbon']['color'],
                    'ribbonTextColor' => $ad['ribbon']['textColor'],
                    'mainImage' => $ad['meddia']['images'],
                    'video360' => $ad['meddia']['360Video'],
                    'video' => $ad['meddia']['video'],
                    'photo' => $ad['meddia']['images'],
                    'licensePlate' => $ad['specification']['plate'],
                    'brand' => $ad['specification']['brand']['name'],
                    'brandId' => $ad['specification']['brand']['id'],
                    'brandUrl' => $ad['specification']['brand']['url'],
                    'model' => $ad['specification']['model']['name'],
                    'modelId' => $ad['specification']['model']['id'],
                    'version' => $ad['specification']['version'],
                    'year' => $ad['specification']['year'],
                    'mileage' => $ad['specification']['mileage'],
                    'engineCapacity' => $ad['specification']['engineCapacity'],
                    'horsepower' => $ad['specification']['horsepower'],
                    'category' => $ad['specification']['category']['name'],
                    'categoryId' => $ad['specification']['category']['id'],
                    'carClass' => $ad['specification']['carClass']['name'],
                    'carClassId' => $ad['specification']['carClass']['id'],
                    'fuelType' => $ad['specification']['fuel']['name'],
                    'fuelTypeId' => $ad['specification']['fuel']['id'],
                    'fuelTypeEng' => $ad['specification']['fuel']['nameEng'],
                    'transmissionType' => $ad['specification']['transmission']['name'],
                    'transmissionTypeId' => $ad['specification']['transmission']['id'],
                    'transmissionTypeEng' => $ad['specification']['transmission']['nameEng'],
                    'steering' => $ad['specification']['steering']['name'],
                    'steeringId' => $ad['specification']['steering']['id'],
                    'traction' => $ad['specification']['traction']['name'],
                    'tractionId' => $ad['specification']['traction']['id'],
                    'bodyType' => $ad['specification']['bodyWork']['name'],
                    'bodyTypeId' => $ad['specification']['bodyWork']['id'],
                    'additionalInfo' => $ad['additionalInfo'],
                    'sellerName' => $adData['seller']['name'],
                    'sellerId' => $adData['seller']['id'],
                ];
            })->toArray(),
        ];
    }
}
