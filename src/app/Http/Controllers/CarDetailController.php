<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;
use App\Services\CarService;
use Illuminate\Support\Facades\Cache;

class CarDetailController extends Controller
{
    protected $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    public function getSingleCar(Request $request, $brand, $model, $autoid, Honeypot $honeypot)
    {
        try {
            $data = $this->carService->getCarDetails($autoid);

            $transformedData = $this->transformCarDetailData($data);

            if (!isset($transformedData['price'])) {
                throw new \Exception('Precio del vehículo no disponible');
            }

            $price = $transformedData['price'];
            $category = $transformedData['categoryID'];
            $brand = $transformedData['brandID'];
            $priceFrom = $price - 2000000;
            $priceUp = $price + 2000000;

            // Parámetros para autos sugeridos
            $suggestedCarsParams = [
                'idClient' => env('APP_SUCURSALES'),
                'page' => 1,
                'quantity' => env('API_SUGGESTED_CARS_QUANTITY'),
                'carid' => $autoid,
                'priceFrom' => $priceFrom,
                'priceUp' => $priceUp,
            ];


            $suggestedCars = Cache::remember("suggested_cars_{$autoid}", 60, function () use ($suggestedCarsParams) {
                return $this->carService->getSuggestedCars($suggestedCarsParams);
            });

            if (empty($suggestedCars['ads'])) {
                $alternativeParams = [
                    'idClient' => env('APP_SUCURSALES'),
                    'page' => 1,
                    'quantity' => env('API_SUGGESTED_CARS_QUANTITY'),
                    'carid' => $autoid,
                    'idCategory' => $category,
                ];

                $suggestedCars = Cache::remember("suggested_cars_category_{$category}", 60, function () use ($alternativeParams) {
                    return $this->carService->getSuggestedCars($alternativeParams);
                });
            }

            return Inertia::render('CarDetail', [
                'data' => $transformedData,
                'honeypot' => $honeypot->toArray(),
                'suggestedCars' => $suggestedCars,
            ]);
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
            $apiUrl = config('services.api.urlfichasv2');
            $apiToken = config('services.api.tokenfichasv2');
            $endpoint = 'vehicle';

            $allCarsData = [];

            // Iterar sobre cada carId y hacer la petición a la API
            foreach ($carIds as $autoid) {
                $queryParams = [
                    'id' => $autoid,
                ];

                $response = Http::withToken($apiToken)->get("$apiUrl/$endpoint", $queryParams);
                if ($response->successful()) {
                    $data = $response->json();
                    $transformedData = $this->transformCarDetailData($data);
                    $allCarsData[] = $transformedData;
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

    function transformCarDetailData($carDetailData)
    {
        $ad = $carDetailData['ad'];
        $seller = $carDetailData['seller'];

        return [
            'clientName' => $seller['name'],
            'clientID' => $seller['id'],
            'latitude' => $seller['address']['latitude'],
            'length' => $seller['address']['longitude'],
            'clientLogo' => $seller['logo'],
            'autoID' => $ad['identifier'],
            'state' => null, // No proporcionado en la nueva respuesta
            'patent' => null, // No proporcionado en la nueva respuesta
            'categoryID' => $ad['specification']['category']['id'],
            'categoryName' => $ad['specification']['category']['name'],
            'brandID' => $ad['specification']['brand']['id'],
            'brandName' => $ad['specification']['brand']['name'],
            'modelID' => $ad['specification']['model']['id'],
            'modelName' => $ad['specification']['model']['name'],
            'version' => $ad['specification']['version'],
            'carBodyID' => null, // No proporcionado en la nueva respuesta
            'carBodyName' => null, // No proporcionado en la nueva respuesta
            'currency' => $ad['prices']['currency'],
            'price' => $ad['prices']['price'],
            'year' => $ad['specification']['year'],
            'color' => null, // No proporcionado en la nueva respuesta
            'origin' => null, // No proporcionado en la nueva respuesta
            'doors' => null, // No proporcionado en la nueva respuesta
            'fuelID' => $ad['specification']['fuel']['id'],
            'fuelName' => $ad['specification']['fuel']['name'],
            'carDisplacement' => null, // No proporcionado en la nueva respuesta
            'kilometers' => $ad['specification']['mileage'],
            'premium' => null, // No proporcionado en la nueva respuesta
            'transmissionID' => $ad['specification']['transmission']['id'],
            'transmissionName' => $ad['specification']['transmission']['name'],
            'traction' => $ad['specification']['traction']['id'],
            'tractionName' => $ad['specification']['traction']['name'],
            'direction' => $ad['specification']['steering']['id'],
            'directionName' => $ad['specification']['steering']['name'],
            'roof' => null, // No proporcionado en la nueva respuesta
            'radio' => null, // No proporcionado en la nueva respuesta
            'lights' => null, // No proporcionado en la nueva respuesta
            'air' => null, // No proporcionado en la nueva respuesta
            'airbag' => null, // No proporcionado en la nueva respuesta
            'description' => $ad['description'],
            'labelID' => $ad['ribbon']['id'],
            'labelTitle' => $ad['ribbon']['name'],
            'labelTitleColor' => $ad['ribbon']['textColor'],
            'phone1' => $seller['contactData']['phoneNumber1'],
            'phone2' => $seller['contactData']['phoneNumber2'],
            'whatsApp' => $seller['contactData']['whatsapp'],
            'urlVideo' => null, // No proporcionado en la nueva respuesta
            'sku' => null, // No proporcionado en la nueva respuesta
            'vin' => null, // No proporcionado en la nueva respuesta
            'hp' => $ad['specification']['horsepower'],
            'publicationDate' => null, // No proporcionado en la nueva respuesta
            'regionID' => $seller['address']['region']['id'],
            'brandLogoURL' => $ad['specification']['brand']['url'],
            'operationalWeight' => null, // No proporcionado en la nueva respuesta
            'loadingCapacity' => null, // No proporcionado en la nueva respuesta
            'elevationHeight' => null, // No proporcionado en la nueva respuesta
            'legalPrice1' => $ad['prices']['legal1'],
            'legalPrice2' => $ad['prices']['legal2'],
            'legalPrice3' => $ad['prices']['legal3'],
            'photos' => $ad['meddia']['images'],
            'features' => array_map(function ($feature) {
                return $feature['name'];
            }, $ad['specification']['characteristic'] ?? []),
        ];
    }
}
