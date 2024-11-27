<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CarService
{
    protected $apiUrl;
    protected $apiToken;
    protected const TIMEOUT_SECONDS = 30;
    protected CarDataTransformer $transformer;

    public function __construct(CarDataTransformer $transformer)
    {
        $this->apiUrl = config('services.api.urlfichasv2');
        $this->apiToken = config('services.api.tokenfichasv2');
        $this->transformer = $transformer;

        if (empty($this->apiUrl) || empty($this->apiToken)) {
            throw new \RuntimeException('No se ha configurado la API');
        }
    }

    public function getCarDetails($autoid)
    {
        if (empty($autoid)) {
            throw new \InvalidArgumentException('El ID del auto no puede estar vacío');
        }

        try {
            $endpoint = 'vehicle';
            $queryParams = ['id' => $autoid];

            $response = Http::withToken($this->apiToken)
                ->timeout(self::TIMEOUT_SECONDS)
                ->get("{$this->apiUrl}/{$endpoint}", $queryParams);
            
            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Error fetching car details', [
                'status' => $response->status(),
                'body' => $response->body(),
                'autoId' => $autoid
            ]);

            throw new \Exception("Error al obtener los detalles del auto. Estado: {$response->status()}");
        } catch (\Exception $e) {
            Log::error('Excepción en getCarDetails', [
                'message' => $e->getMessage(),
                'autoId' => $autoid,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function getSuggestedCars($params)
    {
        if (!is_array($params)) {
            throw new \InvalidArgumentException('Los parámetros deben ser un array');
        }

        $suggestedCarsUrl = "{$this->apiUrl}/vehicles/suggested";
        $fullUrl = "{$suggestedCarsUrl}?" . http_build_query($params);

        try {
            $response = Http::withToken($this->apiToken)
                ->timeout(self::TIMEOUT_SECONDS)
                ->get($fullUrl);

            if ($response->successful()) {
                $json = $response->json();
                return $this->transformer->transformNewApiData($json);
            }

            Log::error('Error al obtener autos sugeridos', [
                'status' => $response->status(),
                'params' => $params,
                'body' => $response->body()
            ]);
        } catch (\Exception $e) {
            Log::error('Error al obtener autos sugeridos', [
                'message' => $e->getMessage(),
                'params' => $params,
                'trace' => $e->getTraceAsString()
            ]);
        }

        return [
            'page' => 1,
            'showing' => 0,
            'total' => 0,
            'ads' => [],
        ];
    }
}
