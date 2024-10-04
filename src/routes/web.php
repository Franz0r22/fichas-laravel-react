<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\CarDetailController;
use App\Http\Controllers\CarQuoteController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Artisan;
use Spatie\Honeypot\ProtectAgainstSpam;
use Inertia\Inertia;
use App\Http\Controllers\FinancingController;


Route::get('/', [CarsController::class, 'getCarsForHome'])->name('home');

Route::get('/autos', [CarsController::class, 'getCars'])->name('cars');

Route::get('/{brand}/{model}/{autoid}', [CarDetailController::class, 'getSingleCar'])->name('carDetail');
Route::post('/comparador', [CarDetailController::class, 'getComparador'])->name('comparador');

Route::get('/contactanos', [ContactController::class, 'showContactForm'])->name('contact');

Route::post('/contact', [ContactController::class, 'sendContactForm'])->middleware(ProtectAgainstSpam::class);

Route::get('/financiamiento', [FinancingController::class, 'showFinancingForm'])->name('financing');

Route::post('/financiamiento', [FinancingController::class, 'sendFinancingForm'])->middleware(ProtectAgainstSpam::class);

Route::post('/quote', CarQuoteController::class)->middleware(ProtectAgainstSpam::class);

Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return 'Todas las cachés han sido borradas';
});
