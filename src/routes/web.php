<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\CarDetailController;
use App\Http\Controllers\CarQuoteController;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

Route::get('/', [CarsController::class, 'getCarsForHome'])->name('home');

Route::get('/autos', [CarsController::class, 'getCars'])->name('cars');

Route::get('/{brand}/{model}/{autoid}', [CarDetailController::class, 'getSingleCar'])->name('carDetail');

route::post('/quote', [CarQuoteController::class, 'store']);

Route::get('/clear-cache', function() {
    
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    
    return "Todas las cachés han sido borradas";
});