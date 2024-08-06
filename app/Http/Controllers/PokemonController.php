<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;


class PokemonController extends Controller
{
    public function index()
    {
        $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=40');
        if ($response->successful()) {
            $pokemons = $response->json()['results'];
            $pokemonDetails = [];

            foreach ($pokemons as $pokemon) {
                $detailResponse = Http::get($pokemon['url']);
                if ($detailResponse->successful()) {
                    $details = $detailResponse->json();
                    $pokemonDetails[] = [
                        'name' => $details['name'],
                        'image' => $details['sprites']['front_default'],
                        'url' => $pokemon['url']
                    ];
                }
            }

            return Inertia::render('PokemonList', ['pokemons' => $pokemonDetails]);
        } else {
            return Inertia::render('PokemonList', ['error' => 'Failed to fetch data']);
        }
    }
}
