<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class CarDataTransformer
{
    public function transformNewApiData($newApiData)
    {
        if (!is_array($newApiData) || !isset($newApiData['ads'])) {
            throw new \InvalidArgumentException('Estructura de datos de API inválida');
        }

        return [
            'page' => $newApiData['page'] ?? 1,
            'showing' => $newApiData['showing'] ?? 0,
            'total' => $newApiData['total'] ?? 0,
            'ads' => collect($newApiData['ads'])->map(function ($adData) {
                if (!isset($adData['ad'])) {
                    Log::warning('Datos del auto faltantes en la respuesta de la API', ['adData' => $adData]);
                    return null;
                }

                $ad = $adData['ad'];
                return [
                    'carId' => $ad['identifier'] ?? null,
                    'keyword' => $ad['keyword'] ?? null,
                    'publicationDate' => $ad['publicationDate'] ?? null,
                    'price' => $ad['prices']['price'] ?? null,
                    'currency' => $ad['prices']['currency'] ?? null,
                    'legal1' => $ad['prices']['legal1'] ?? null,
                    'legal2' => $ad['prices']['legal2'] ?? null,
                    'legal3' => $ad['prices']['legal3'] ?? null,
                    'ribbonId' => $ad['ribbon']['id'] ?? null,
                    'ribbonName' => $ad['ribbon']['name'] ?? null,
                    'ribbonColor' => $ad['ribbon']['color'] ?? null,
                    'ribbonTextColor' => $ad['ribbon']['textColor'] ?? null,
                    'mainImage' => $ad['meddia']['images'] ?? null,
                    'video360' => $ad['meddia']['360Video'] ?? null,
                    'video' => $ad['meddia']['video'] ?? null,
                    'photo' => $ad['meddia']['images'] ?? null,
                    'licensePlate' => $ad['specification']['plate'] ?? null,
                    'brand' => $ad['specification']['brand']['name'] ?? null,
                    'brandId' => $ad['specification']['brand']['id'] ?? null,
                    'brandUrl' => $ad['specification']['brand']['url'] ?? null,
                    'model' => $ad['specification']['model']['name'] ?? null,
                    'modelId' => $ad['specification']['model']['id'] ?? null,
                    'version' => $ad['specification']['version'] ?? null,
                    'year' => $ad['specification']['year'] ?? null,
                    'mileage' => $ad['specification']['mileage'] ?? null,
                    'engineCapacity' => $ad['specification']['engineCapacity'] ?? null,
                    'horsepower' => $ad['specification']['horsepower'] ?? null,
                    'category' => $ad['specification']['category']['name'] ?? null,
                    'categoryId' => $ad['specification']['category']['id'] ?? null,
                    'carClass' => $ad['specification']['carClass']['name'] ?? null,
                    'carClassId' => $ad['specification']['carClass']['id'] ?? null,
                    'fuelType' => $ad['specification']['fuel']['name'] ?? null,
                    'fuelTypeId' => $ad['specification']['fuel']['id'] ?? null,
                    'fuelTypeEng' => $ad['specification']['fuel']['nameEng'] ?? null,
                    'transmissionType' => $ad['specification']['transmission']['name'] ?? null,
                    'transmissionTypeId' => $ad['specification']['transmission']['id'] ?? null,
                    'transmissionTypeEng' => $ad['specification']['transmission']['nameEng'] ?? null,
                    'steering' => $ad['specification']['steering']['name'] ?? null,
                    'steeringId' => $ad['specification']['steering']['id'] ?? null,
                    'traction' => $ad['specification']['traction']['name'] ?? null,
                    'tractionId' => $ad['specification']['traction']['id'] ?? null,
                    'bodyType' => $ad['specification']['bodyWork']['name'] ?? null,
                    'bodyTypeId' => $ad['specification']['bodyWork']['id'] ?? null,
                    'additionalInfo' => $ad['additionalInfo'] ?? null,
                    'sellerName' => $adData['seller']['name'] ?? null,
                    'sellerId' => $adData['seller']['id'] ?? null,
                ];
            })->filter()->toArray(), // Elimina los valores null
        ];
    }
} 