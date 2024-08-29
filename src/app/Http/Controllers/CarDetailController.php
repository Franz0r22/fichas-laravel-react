<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CarDetailController extends Controller
{
public function getSingleCar(Request $request, $brand, $model, $autoid)
{
    try {
        $apiUrl = config('services.api.url_v2');
        $apiToken = config('services.api.token');
        $endpoint = 'car';

        $queryParams = [
            'dataBase' => 1,
            'autoid' => $autoid,
        ];
        $response = Http::withToken($apiToken)
            ->get("$apiUrl/$endpoint", $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            return Inertia::render('CarDetail', [
                'data' => $data,
            ]);
        } else {
            throw new \Exception('Failed to fetch data');
        }
    } catch (\Exception $e) {
        return Inertia::render('CarDetail', [
            'error' => $e->getMessage()
        ]);
    }
}
}