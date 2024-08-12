<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ApiController extends Controller
{
    public function fetchAutos(Request $request)
    {

        $apiUrl = config('services.api.url');
        $apiToken = config('services.api.token');
        $endpoint = 'carDealers/stock';

        $response = Http::withToken($apiToken)
                        ->get("$apiUrl/$endpoint", [
                            'CLIENTEID' => env('APP_SUCURSALES'),
                            'TABLA' => 1,
                            'PageNumber' => 1,
                            'PageSize' => 12,
                        ]);

        if ($response->successful()) {
            $data = $response->json();
            return Inertia::render('Autos', ['data' => $data]);
        } else {
            return Inertia::render('Autos', ['error' => 'Failed to fetch data']);
        }
    }
}
