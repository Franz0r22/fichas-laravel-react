<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\ApiController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', ['name' => 'React e Inertia.js']);
});

Route::get('/pokemon', [PokemonController::class, 'index']);

Route::get('/autos', [ApiController::class, 'fetchAutos']);