<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CarService
{
    protected $apiUrl;
    protected $apiToken;

    public function __construct()
    {
        $this->apiUrl = config('services.api.urlfichasv2');
        $this->apiToken = config('services.api.tokenfichasv2');
    }

    public function getCarDetails($autoid)
    {
        $endpoint = 'vehicle';
        $queryParams = ['id' => $autoid];

        $response = Http::withToken($this->apiToken)->get("{$this->apiUrl}/{$endpoint}", $queryParams);
        
        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to fetch car details');
    }

    public function getSuggestedCars($params)
    {
        $suggestedCarsUrl = "{$this->apiUrl}/vehicles/suggested";
        $fullUrl = "{$suggestedCarsUrl}?" . http_build_query($params);

        try {
            $response = Http::withToken($this->apiToken)->get($fullUrl);

            if ($response->successful()) {
                $json = $response->json();
                return $this->transformNewApiData($json);
            }
        } catch (\Exception $e) {
            Log::error('Failed to fetch suggested cars: ' . $e->getMessage());
        }

        return [
            'page' => 1,
            'showing' => 0,
            'total' => 0,
            'ads' => [],
        ];
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
