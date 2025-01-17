<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;
use App\Services\CarService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

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

            $iconsFeatures = collect($transformedData['features'])->mapWithKeys(function ($caracteristica) {
                $slug = Str::slug($caracteristica, '-');
                $imagePath = public_path("images/equipamiento/{$slug}.svg");
    
                return [
                    $caracteristica => File::exists($imagePath) ? asset("images/equipamiento/{$slug}.svg") : null,
                ];
            }); 

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
                'iconsFeatures' => $iconsFeatures,
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
        // Validar que $carDetailData tenga las claves necesarias
        if (!isset($carDetailData['ad']) || !isset($carDetailData['seller'])) {
            throw new \InvalidArgumentException('Los datos del coche no tienen el formato esperado');
        }

        $ad = $carDetailData['ad'];
        $seller = $carDetailData['seller'];

        // Función auxiliar para obtener valores de forma segura
        $getValue = function ($array, $keys, $default = null) {
            foreach ($keys as $key) {
                if (!isset($array[$key])) return $default;
                $array = $array[$key];
            }
            return $array;
        };

        return [
            'clientName' => $getValue($seller, ['name']),
            'clientID' => $getValue($seller, ['id']),
            'latitude' => $getValue($seller, ['address', 'latitude']),
            'length' => $getValue($seller, ['address', 'longitude']),
            'clientLogo' => $getValue($seller, ['logo']),
            'autoID' => $getValue($ad, ['identifier']),
            'categoryID' => $getValue($ad, ['specification', 'category', 'id']),
            'categoryName' => $getValue($ad, ['specification', 'category', 'name']),
            'brandID' => $getValue($ad, ['specification', 'brand', 'id']),
            'brandName' => $getValue($ad, ['specification', 'brand', 'name']),
            'modelID' => $getValue($ad, ['specification', 'model', 'id']),
            'modelName' => $getValue($ad, ['specification', 'model', 'name']),
            'version' => $getValue($ad, ['specification', 'version']),
            'currency' => $getValue($ad, ['prices', 'currency']),
            'price' => $getValue($ad, ['prices', 'price']),
            'year' => $getValue($ad, ['specification', 'year']),
            'fuelID' => $getValue($ad, ['specification', 'fuel', 'id']),
            'fuelName' => $getValue($ad, ['specification', 'fuel', 'name']),
            'kilometers' => $getValue($ad, ['specification', 'mileage']),
            'transmissionID' => $getValue($ad, ['specification', 'transmission', 'id']),
            'transmissionName' => $getValue($ad, ['specification', 'transmission', 'name']),
            'traction' => $getValue($ad, ['specification', 'traction', 'id']),
            'tractionName' => $getValue($ad, ['specification', 'traction', 'name']),
            'direction' => $getValue($ad, ['specification', 'steering', 'id']),
            'directionName' => $getValue($ad, ['specification', 'steering', 'name']),
            'description' => $getValue($ad, ['description']),
            'labelID' => $getValue($ad, ['ribbon', 'id']),
            'labelTitle' => $getValue($ad, ['ribbon', 'name']),
            'labelTitleColor' => $getValue($ad, ['ribbon', 'textColor']),
            'phone1' => $getValue($seller, ['contactData', 'phoneNumber1']),
            'phone2' => $getValue($seller, ['contactData', 'phoneNumber2']),
            'whatsApp' => $getValue($seller, ['contactData', 'whatsapp']),
            'mail' => $getValue($seller, ['contactData', 'mail']),
            'hp' => $getValue($ad, ['specification', 'horsepower']),
            'regionID' => $getValue($seller, ['address', 'region', 'id']),
            'brandLogoURL' => $getValue($ad, ['specification', 'brand', 'url']),
            'legalPrice1' => $getValue($ad, ['prices', 'legal1']),
            'legalPrice2' => $getValue($ad, ['prices', 'legal2']),
            'legalPrice3' => $getValue($ad, ['prices', 'legal3']),
            'photos' => $getValue($ad, ['meddia', 'images'], []),
            'features' => array_map(function ($feature) {
                return $feature['name'] ?? null;
            }, $getValue($ad, ['specification', 'characteristic'], [])),
        ];
    }
}
