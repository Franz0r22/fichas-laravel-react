<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\CarDetailController;
use App\Http\Controllers\CarQuoteController;
use Inertia\Inertia;

Route::get('/', [CarsController::class, 'getCarsForHome']);

Route::get('/autos', [CarsController::class, 'getCars']);

Route::get('/{brand}/{model}/{autoid}', [CarDetailController::class, 'getSingleCar']);

route::post('/quote', [CarQuoteController::class, 'store']);