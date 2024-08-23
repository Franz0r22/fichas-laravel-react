<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarsController;
use Inertia\Inertia;

Route::get('/', [CarsController::class, 'getCarsForHome']);

Route::get('/autos', [CarsController::class, 'getCars']);

